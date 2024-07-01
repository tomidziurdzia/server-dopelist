const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    name: "Ariana",
    lastname: "Chica",
    email: "arianachica@gmail.com",
    id: "777",
  },
];

const dopes = [
  {
    link: "https://maps.app.goo.gl/TJWFyhcyTJuzpBoK7",
    name: "Honest Greens Barceloneta · Passeig del Mare Nostrum, 15, local 1, Ciutat Vella, 08039 Barcelona, Spain",
    description: "★★★★☆ · Health food restaurant",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipN9tOVkuFrctZQAWHJ8JNeNSM1npIqz4S5VxRu8=w408-h272-k-no",
  },
  {
    link: "https://maps.app.goo.gl/tc457SvdsNRNvKRC7",
    name: "arol.dev · Passeig del Mare Nostrum, 15, Planta 2, Ciutat Vella, 08039 Barcelona, Spain",
    description: "★★★★★ · Educational institution",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPZRHokfUiD-9inuSn-WirSZt9c5jUJWARTDj7L=w900-h900-k-no-p",
  },
  {
    link: "https://maps.app.goo.gl/yGcuvRogLkHu7rup9",
    name: "Entrepaneria Compá Barceloneta · C. de Sant Carles, 19, Ciutat Vella, 08003 Barcelona, Spain",
    description: "★★★★★ · Sandwich shop",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipNsikXkDp-DJG44svyNZtL9p0QqACV6zjoDR17_=w426-h240-k-no",
  },
  {
    link: "https://maps.app.goo.gl/AwTYYsz8b97pfVXU6",
    name: "Basílica de la Sagrada Família · Eixample, 08013 Barcelona, Spain",
    description: "★★★★★ · Basilica",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPvcLglf3S0-gNAZEVATnRTaObdbR4fcclktCO0=w408-h306-k-no",
  },
  {
    link: "https://maps.app.goo.gl/6wmYH5dn85HAU6EU9",
    name: "Telefèric de Montjuïc (Barcelona Cable Car) · Avinguda Miramar, 30, Sants-Montjuïc, 08038 Barcelona, Spain",
    description: "★★★★☆ · Mountain cable car",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipNB7kaSD6pNjA0M_qn1BoOgF7PGNeY4RFuIY0Ok=w426-h240-k-no",
  },
  {
    link: "https://maps.app.goo.gl/JLXfaDhDxRQWYkERA",
    name: "Ciutadella Park · Ciutat Vella, 08003 Barcelona, Spain",
    description: "★★★★★ · Park",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipO8cY6s0WIy8TmYOjBzvZizCYKcD7NVlrC-dxDA=w408-h306-k-no",
  },
  {
    link: "https://maps.app.goo.gl/P4HctEmR2c4wNrf9A",
    name: "Plaça de Catalunya · Plaça de Catalunya, L'Eixample, 08002 Barcelona, Spain",
    description: "★★★★★ · Plaza",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipM_5RMgqEBoLEYY-Wr5vJFbZyCEJnLanpyLxhYn=w408-h306-k-no",
  },
  {
    link: "https://maps.app.goo.gl/v8ihJaKWHJmnWJ6R9",
    name: "Casa Batlló · Pg. de Gràcia, 43, L'Eixample, 08007 Barcelona, Spain",
    description: "★★★★★ · Historical landmark",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipNkn1skmlCCzAe__ny9pfe0nqpWlR0bMKXne1oH=w408-h544-k-no",
  },
];

const dopelists = [
  {
    name: "Restaurants",
  },
  {
    name: "Work",
  },
  {
    name: "Music",
  },
  {
    name: "Fashion",
  },
];

async function main() {
  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
      },
    });
  }

  for (const dopelist of dopelists) {
    await prisma.dopelist.create({
      data: {
        name: dopelist.name,
        userId: "777",
      },
    });
  }

  for (const dope of dopes) {
    await prisma.dope.create({
      data: {
        link: dope.link,
        name: dope.name,
        description: dope.description,
        image: dope.image,
        userId: "777",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
