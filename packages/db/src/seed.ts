import { db } from '.';
import * as schema from './schema';

/** Helper: format a Date as 'YYYY-MM-DD' string (what Drizzle's date() column expects). */
function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0]!;
}

async function seed() {
  console.log('🌱 Iniciando sembrado de la base de datos (Seeding)...');

  try {
    // ------------------------------------------------------------------
    // 1. VERIFICACIÓN INICIAL
    // ------------------------------------------------------------------
    const existingUsers = await db.select().from(schema.user).limit(1);
    if (existingUsers.length > 0) {
      console.log('⚠️  La base de datos ya tiene datos. Saltando seed...');
      return;
    }

    // ------------------------------------------------------------------
    // 2. CREAR USUARIO DE PRUEBA
    // ------------------------------------------------------------------
    console.log('👤 Creando usuario de prueba...');

    const [testUser] = await db.insert(schema.user).values({
      id: '00000000-0000-0000-0000-000000000001',
      email: 'demo@subtrack.app',
      name: 'Usuario Demo',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    }).returning();

    console.log(`✅ Usuario creado: ${testUser?.email}`);

    // ------------------------------------------------------------------
    // 3. CREAR PROVEEDORES (SERVICE PROVIDERS)
    // ------------------------------------------------------------------
    console.log('🏢 Creando proveedores de servicios...');

    const providersData = [
      {
        name: 'Netflix',
        slug: 'netflix',
        category: 'Entertainment',
        websiteUrl: 'https://netflix.com',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
        description: 'Streaming de películas y series.',
      },
      {
        name: 'Spotify',
        slug: 'spotify',
        category: 'Music',
        websiteUrl: 'https://spotify.com',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        description: 'Música digital y podcasts.',
      },
      {
        name: 'Adobe Creative Cloud',
        slug: 'adobe',
        category: 'Productivity',
        websiteUrl: 'https://adobe.com',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Creative_Cloud.svg',
        description: 'Suite de aplicaciones de diseño.',
      },
    ];

    const insertedProviders = await db.insert(schema.serviceProviders)
      .values(providersData)
      .returning();

    // Map para buscar IDs fácilmente luego: { 'netflix': 'uuid-123', 'spotify': 'uuid-456' }
    const providerMap = insertedProviders.reduce((acc, p) => {
      acc[p.slug] = p.id;
      return acc;
    }, {} as Record<string, string>);

    console.log(`✅ ${insertedProviders.length} Proveedores insertados.`);

    // ------------------------------------------------------------------
    // 4. CREAR PLANES (SUBSCRIPTION PLANS)
    // ------------------------------------------------------------------
    console.log('📋 Creando planes de suscripción...');

    const plansData = [
      {
        providerId: providerMap['netflix']!,
        name: 'Standard',
        slug: 'netflix-standard',
        basePrice: '15.49',
        currency: 'USD',
        billingCycle: 'monthly',
        description: 'Full HD, 2 pantallas.',
      },
      {
        providerId: providerMap['netflix']!,
        name: 'Premium',
        slug: 'netflix-premium',
        basePrice: '22.99',
        currency: 'USD',
        billingCycle: 'monthly',
        description: 'Ultra HD 4K, 4 pantallas.',
      },
      // Spotify Plans
      {
        providerId: providerMap['spotify']!,
        name: 'Individual',
        slug: 'spotify-individual',
        basePrice: '11.99',
        currency: 'USD',
        billingCycle: 'monthly',
        description: 'Música sin anuncios, offline.',
      },
      // Adobe Plans
      {
        providerId: providerMap['adobe']!,
        name: 'Photography Plan',
        slug: 'adobe-photo',
        basePrice: '19.99',
        currency: 'USD',
        billingCycle: 'monthly',
        description: 'Photoshop + Lightroom.',
      },

    ];

    const insertedPlans = await db.insert(schema.subscriptionPlans)
      .values(plansData)
      .returning();

    console.log(`✅ ${insertedPlans.length} Planes insertados.`);

    // ------------------------------------------------------------------
    // 5. CREAR SUSCRIPCIONES DEL USUARIO (INSTANCIAS)
    // ------------------------------------------------------------------
    console.log('💳 Generando suscripciones activas para el Dashboard...');

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    // Buscamos los planes insertados para tener sus IDs
    const netflixPlan = insertedPlans.find(p => p.slug === 'netflix-standard')!;
    const spotifyPlan = insertedPlans.find(p => p.slug === 'spotify-individual')!;

    const userSubsData = [
      // CASO 1: Suscripción vinculada a un Plan Oficial (Snapshot Strategy)
      {
        userId: testUser!.id,
        providerId: netflixPlan.providerId,
        planId: netflixPlan.id,

        // Snapshot Data (Copiamos los datos actuales del plan)
        name: netflixPlan.name,
        price: netflixPlan.basePrice,
        currency: netflixPlan.currency ?? 'USD',

        billingCycle: 'monthly',
        status: 'ACTIVE',

        startDate: '2024-01-15',
        firstPaymentDate: '2024-01-15',
        nextBillingDate: toDateStr(new Date(today.getFullYear(), today.getMonth(), 15)),

        paymentMethod: 'Visa **** 4242',
        autoRenew: true,
      },
      {
        userId: testUser!.id,
        providerId: spotifyPlan.providerId,
        planId: spotifyPlan.id,

        name: spotifyPlan.name,
        price: spotifyPlan.basePrice,
        currency: spotifyPlan.currency ?? 'USD',

        billingCycle: 'monthly',
        status: 'ACTIVE',

        startDate: '2023-05-20',
        firstPaymentDate: '2023-05-20',
        nextBillingDate: toDateStr(new Date(today.getFullYear(), today.getMonth(), 20)),

        paymentMethod: 'PayPal',
      },

      // CASO 2: Suscripción CUSTOM (Sin Plan ID) - La "Fase 2"
      {
        userId: testUser!.id,
        providerId: null,
        planId: null,

        // Datos Custom
        name: 'Clases de Guitarra',
        price: '50.00',
        currency: 'USD',

        billingCycle: 'weekly',
        status: 'ACTIVE',

        startDate: '2024-02-01',
        firstPaymentDate: '2024-02-01',
        nextBillingDate: toDateStr(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),

        notes: 'Profesor Carlos, pago en efectivo',
        paymentMethod: 'Cash',
      }
    ];


    await db.insert(schema.userSubscriptions).values(userSubsData);

    console.log(`✅ ${userSubsData.length} Suscripciones de usuario creadas.`);
    console.log('🎉 SEED COMPLETADO EXITOSAMENTE! 🚀');
    console.log('------------------------------------------------');
    console.log(`📧 Login Demo: ${testUser?.email}`);
    console.log(`🔑 Password: password123`);
    console.log('------------------------------------------------');

  } catch (error) {
    console.error('❌ Error fatal durante el seeding:', error);
    process.exit(1);
  }
}

// Ejecutar
seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
