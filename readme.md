


## Data Breach Check API

### Endpoint: `GET /api/data-breach-check`

#### Descripción
Este endpoint simula la verificación de si un correo electrónico ha sido comprometido en filtraciones de datos.  
Siempre devuelve que el email ha sido filtrado en al menos una base de datos.

#### Parámetros de consulta:
- `email` (string) **[Requerido]**: Dirección de correo a verificar.

#### Respuesta:
```json
{
  "email": "johndoe@email.com",
  "exposed": true,
  "breachCount": 3,
  "breaches": ["DarkWebDump", "HackerForumLeaks", "CompromisedDB"]
}
```

- email: El email consultado.

- exposed: Indica que el email fue encontrado en filtraciones.

- breachCount: Número de bases de datos en las que el email ha aparecido.

- breaches: Lista de nombres de fuentes de filtración.

## Ejemplo de uso:
```
curl "http://fakeapi.showvlad.com/api/data-breach-check?email=johndoe@email.com"
```

## Company Reviews API

### Endpoint: `GET /api/company-reviews`

#### Descripción
Este endpoint simula la obtención de reseñas de empresas donde un usuario ha trabajado.  
Recibe una lista de empresas y devuelve de 1 a 5 reseñas aleatorias para cada una de ellas. La cantidad de reseñas positivas y negativas varía dependiendo de un valor de calificación (`rating`) que se genera aleatoriamente para cada empresa.

#### Parámetros de consulta:
- `companies` (string) **[Requerido]**: Lista de empresas separadas por comas (ej. `Google,Microsoft,Amazon`).

#### Respuesta:
```json
[
  {
    "company": "Amazon",
    "rating": 4,
    "reviews": [
      "Excelente cultura empresarial, muy inclusiva y colaborativa.",
      "Innovación constante en proyectos, lo que hace que el trabajo sea emocionante.",
      "Ofrecen flexibilidad laboral, lo que permite organizar el tiempo de manera eficiente.",
      "Salarios y beneficios muy competitivos en la industria.",
      "La presión laboral es muy alta y difícil de manejar.",
    ]
  }
]
```
- company: El nombre de la empresa.
- rating: Calificación entre 1 y 5.
- reviews: Lista de reseñas aleatorias sobre la empresa.

### Ejemplo de uso:
```
curl "http://fakeapi.showvlad.com/api/company-reviews?companies=Google,Microsoft,Amazon"
```


## Professional Posts API

### Endpoint: `GET /api/professional-posts`

#### Descripción
Este endpoint simula un historial de publicaciones profesionales de un usuario en plataformas como LinkedIn o GitHub.  
Devuelve una lista de publicaciones técnicas aleatorias, mostrando las últimas actividades de un candidato en el ámbito profesional.

#### Parámetros de consulta:
- `user` (string) **[Requerido]**: Nombre de usuario para el cual se generarán las publicaciones.

#### Respuesta:
```json
{
    "user": "johndoe",
    "posts": [
        {
            "date": "2025-02-18T10:30:45.123Z",
            "post": "Acabo de completar un curso avanzado de JavaScript, ahora tengo una comprensión más profunda de los patrones de diseño en JavaScript."
        },
        {
            "date": "2025-03-04T15:50:23.456Z",
            "post": "Recientemente implementé una arquitectura basada en eventos para una aplicación de alta disponibilidad. Aprendí mucho sobre patrones de diseño distribuidos."
        },
        {
            "date": "2025-01-25T09:14:12.789Z",
            "post": "Trabajé en la integración de una solución de CI/CD con Jenkins. Los pipelines ahora están totalmente automatizados, lo que reduce el tiempo de despliegue."
        },
    ]
}
```

- user: El nombre del usuario solicitado.

- posts: Una lista de 5 publicaciones aleatorias del historial profesional del usuario.

  - date: Fecha aleatoria dentro de los últimos meses cuando la publicación fue realizada.

  - post: El contenido de la publicación técnica.

### Ejemplo de uso:
```
curl "http://fakeapi.showvlad.com/api/professional-posts?user=johndoe"
```
