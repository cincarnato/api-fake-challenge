import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import FastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

// Registrar el plugin fastify-static
fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'img'),
  prefix: '/img/', // This will be the prefix for accessing images
});

fastify.get('/', async (request, reply) => {
  return reply.send({
    message: "Bienvenido a la API Fake para Challenges Técnicos de Desarrollo",
    description: "Esta API proporciona endpoints simulados para diversos escenarios comunes en aplicaciones web y móviles.",
    purpose: "Diseñada para ser utilizada en desafíos técnicos de desarrollo, permitiendo a los candidatos demostrar sus habilidades en la integración y manejo de APIs.",
    endpoints: [
      {
        path: "/api/data-breach-check",
        description: "Simula la verificación de filtración de datos para un email."
      },
      {
        path: "/api/company-reviews",
        description: "Proporciona reseñas simuladas para empresas."
      },
      {
        path: "/api/professional-posts",
        description: "Genera publicaciones profesionales aleatorias para un usuario."
      },
      {
        path: "/api/event-authorization",
        description: "Simula la autorización de ingreso a un evento basado en DNI."
      },
      {
        path: "/api/event-drinks",
        description: "Lista bebidas disponibles para un evento, incluyendo detalles e imágenes."
      },
      {
        path: "/img/:imageName",
        description: "Sirve imágenes estáticas para las bebidas del evento."
      }
    ],
    note: "Todos los datos proporcionados por esta API son ficticios y generados aleatoriamente para fines de desarrollo y pruebas."
  });
});

fastify.get('/api/data-breach-check', async (request, reply) => {
    const { email } = request.query;

    if (!email) {
        return reply.status(400).send({ error: 'Email is required' });
    }

    // Generar una cantidad aleatoria de filtraciones entre 1 y 10
    const breachCount = Math.floor(Math.random() * 10) + 1;
    const leakSources = [
        'DarkWebDump', 'HackerForumLeaks', 'CompromisedDB', 'ShadowBreach',
        'UndergroundMarket', 'BlackHatRepo', 'LeakedCredentials', 'PwnedList',
        'CyberSpyLeaks', 'AnonDataDump'
    ];

    return reply.send({
        email,
        exposed: true,
        breachCount,
        breaches: leakSources.slice(0, breachCount)
    });
});

fastify.get('/api/company-reviews', async (request, reply) => {
    const { companies } = request.query;

    if (!companies) {
        return reply.status(400).send({ error: 'Companies parameter is required' });
    }

    const positiveReviews = [
        "Ambiente de trabajo increíble, con un equipo siempre dispuesto a ayudar.",
        "Gran balance entre vida personal y profesional.",
        "Oportunidades continuas para aprender y crecer profesionalmente.",
        "Excelente cultura empresarial, muy inclusiva y colaborativa.",
        "La dirección es muy accesible y siempre te da feedback constructivo.",
        "Innovación constante en proyectos, lo que hace que el trabajo sea emocionante.",
        "Ofrecen flexibilidad laboral, lo que permite organizar el tiempo de manera eficiente.",
        "Salarios y beneficios muy competitivos en la industria.",
        "Se valora mucho el esfuerzo y el trabajo bien hecho, lo cual motiva a seguir mejorando.",
        "Ambiente relajado pero productivo, ideal para enfocarse en los proyectos."
    ];

    const negativeReviews = [
        "La presión laboral es muy alta y difícil de manejar.",
        "Falta de claridad en la comunicación por parte de la gerencia.",
        "Los plazos de entrega son muy ajustados, lo que genera estrés innecesario.",
        "A menudo, los recursos necesarios para realizar el trabajo no están disponibles.",
        "El trabajo se vuelve monótono y carece de variedad.",
        "No hay muchas oportunidades de crecimiento profesional dentro de la empresa.",
        "La cultura de la empresa no es inclusiva, lo que crea un ambiente poco acogedor.",
        "Los beneficios son limitados y no están a la altura de lo que se esperaría.",
        "El balance entre vida personal y trabajo es muy difícil de lograr.",
        "No se valora el esfuerzo individual, lo que afecta la motivación de los empleados."
    ];

    const companiesList = companies.split(','); // Divide las empresas proporcionadas por coma

    const reviewsForCompanies = companiesList.map(company => {
        // Generar un rating aleatorio entre 1 y 5
        const rating = Math.floor(Math.random() * 5) + 1;
        const positiveCount = rating; // Proporción de reseñas positivas
        const negativeCount = 5 - positiveCount; // El resto serán reseñas negativas

        const selectedPositiveReviews = positiveReviews.slice(0, positiveCount);
        const selectedNegativeReviews = negativeReviews.slice(0, negativeCount);

        const companyReviews = [
            ...selectedPositiveReviews,
            ...selectedNegativeReviews
        ];

        return {
            company,
            rating,
            reviews: companyReviews
        };
    });

    return reply.send(reviewsForCompanies);
});

fastify.get('/api/professional-posts', async (request, reply) => {
    const { user } = request.query;

    if (!user) {
        return reply.status(400).send({ error: 'User parameter is required' });
    }

    const posts = [
        "Acabo de completar un curso avanzado de JavaScript, ahora tengo una comprensión más profunda de los patrones de diseño en JavaScript.",
        "Implementé un sistema de caché con Redis para mejorar la performance en una API RESTful, ¡los resultados han sido increíbles!",
        "Hoy aprendí sobre cómo los microservicios pueden mejorar la escalabilidad y la mantenibilidad de una aplicación. ¡Estoy emocionado de aplicarlo en mis próximos proyectos!",
        "Colaboré en un proyecto de código abierto que optimiza el rendimiento de bases de datos NoSQL. Fue una experiencia enriquecedora.",
        "Desarrollé una aplicación de procesamiento de imágenes utilizando Node.js y Express. Me enfoqué en optimizar la carga de archivos grandes.",
        "Recientemente implementé una arquitectura basada en eventos para una aplicación de alta disponibilidad. Aprendí mucho sobre patrones de diseño distribuidos.",
        "Investigando sobre la implementación de Docker Swarm para orquestación de contenedores, espero que facilite la escalabilidad de nuestros microservicios.",
        "Trabajé en la integración de una solución de CI/CD con Jenkins. Los pipelines ahora están totalmente automatizados, lo que reduce el tiempo de despliegue.",
        "Acabo de contribuir a un proyecto que optimiza el rendimiento de consultas SQL en bases de datos grandes. Estoy muy satisfecho con los resultados obtenidos.",
        "Revisé un código para mejorar la seguridad de las aplicaciones web utilizando técnicas avanzadas de cifrado. La protección de datos es una prioridad."
    ];

    // Generar 3 publicaciones aleatorias del historial
    const postsCount = 3;
    const selectedPosts = [];

    for (let i = 0; i < postsCount; i++) {
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        selectedPosts.push({
            date: new Date(Date.now() - (Math.random() * 10000000000)).toISOString(), // Fecha aleatoria dentro de los últimos meses
            post: randomPost
        });
    }

    return reply.send({
        user,
        posts: selectedPosts
    });
});

fastify.get('/api/event-authorization', async (request, reply) => {
    const { dni } = request.query;

    if (!dni) {
        return reply.status(400).send({ error: 'DNI parameter is required' });
    }

    // Generar una autorización aleatoria con 50% de probabilidad
    const isAuthorized = Math.random() < 0.5;

    return reply.send({
        dni,
        authorized: isAuthorized,
        message: isAuthorized 
            ? 'El DNI está autorizado para ingresar al evento.' 
            : 'El DNI no está autorizado para ingresar al evento.'
    });
});

fastify.get('/api/event-drinks', async (request, reply) => {
    const drinks = [
        {
            id: 1,
            name: "Coca-Cola",
            description: "Refresco carbonatado clásico",
            price: 2.50,
            alcoholic: false,
            image: "/img/cocacola.png"
        },
        {
            id: 2,
            name: "Heineken",
            description: "Cerveza lager premium holandesa",
            price: 3.50,
            alcoholic: true,
            image: "/img/heineken.png"
        },
        {
            id: 3,
            name: "Agua Mineral",
            description: "Agua natural sin gas",
            price: 1.50,
            alcoholic: false,
            image: "/img/agua.png"
        },
        {
            id: 4,
            name: "Margarita",
            description: "Cóctel a base de tequila, triple sec y lima",
            price: 7.00,
            alcoholic: true,
            image: "/img/margarita.png"
        },
        {
            id: 5,
            name: "Sprite",
            description: "Refresco de lima-limón",
            price: 2.50,
            alcoholic: false,
            image: "/img/sprite.png"
        },
        {
            id: 6,
            name: "Mojito",
            description: "Cóctel cubano a base de ron, lima, menta y azúcar",
            price: 6.50,
            alcoholic: true,
            image: "/img/mojito.png"
        },
        {
            id: 7,
            name: "Fanta",
            description: "Refresco carbonatado de naranja",
            price: 2.50,
            alcoholic: false,
            image: "/img/fanta.png"
        },
        {
            id: 8,
            name: "Gin Tonic",
            description: "Cóctel de ginebra y agua tónica",
            price: 6.00,
            alcoholic: true,
            image: "/img/gintonic.png"
        },
        {
            id: 9,
            name: "Limonada",
            description: "Bebida refrescante de limón natural",
            price: 3.00,
            alcoholic: false,
            image: "/img/limonada.png"
        },
        {
            id: 10,
            name: "Whisky on the Rocks",
            description: "Whisky servido con hielo",
            price: 8.00,
            alcoholic: true,
            image: "/img/whisky.png"
        },
        {
            id: 11,
            name: "Té Helado",
            description: "Té frío con un toque de limón",
            price: 2.75,
            alcoholic: false,
            image: "/img/tehelado.png"
        },
        {
            id: 12,
            name: "Piña Colada",
            description: "Cóctel tropical a base de ron, coco y piña",
            price: 7.50,
            alcoholic: true,
            image: "/img/pinacolada.png"
        },
        {
            id: 13,
            name: "Smoothie de Frutas",
            description: "Batido de frutas frescas variadas",
            price: 4.50,
            alcoholic: false,
            image: "/img/smoothie.png"
        },
        {
            id: 14,
            name: "Cerveza Artesanal IPA",
            description: "Cerveza India Pale Ale con sabor intenso y amargo",
            price: 5.00,
            alcoholic: true,
            image: "/img/ipa.png"
        },
        {
            id: 15,
            name: "Jugo de Naranja Natural",
            description: "Zumo de naranja recién exprimido",
            price: 3.25,
            alcoholic: false,
            image: "/img/jugonaranja.png"
        }
    ];

    return reply.send(drinks);
});

fastify.get('/img/:imageName', async (request, reply) => {
  return reply.sendFile(request.params.imageName);
});

const start = async () => {
    try {
        const port = process.env.PORT || 3000;
        await fastify.listen({ port: port, host: '0.0.0.0' });
        console.log(`Server running on http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
