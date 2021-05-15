import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect()


  // const user = await prisma.user.update({
    // where: {
      // email: "joseph.atureta@gmail.com"
    // },
    // data: {
      // lastName: "A"
    // }
  // })
// 
  // console.dir(user, {depth: Infinity})


  await prisma.post.update({
    where: {
      slug: "prisma-loves-mongodb",
    },
    data: { 
      comments: {
        createMany: {
          data: [
            { 
              comment: "Great Post",
              authorId: "609f2243006ce39200efe06c",
            },
            { 
              comment: "Can't wait to try this",
              authorId: "609f2243006ce39200efe06c"
              }
          ]
        }
      },
      body: "This is my first post. Isn't MongoDB + Prisma awesome?!"
    }, 
  })

  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  })

  console.dir(posts, { depth: Infinity })


  //CREATE POST
  // await prisma.post.create({
    // data: {
      // title: "Prisma <3 MongoDB",
      // slug: "prisma-loves-mongodb",
      // body: "This is my first post. Isn't MongoDB + Prisma awesome?!",
      // author: {
        // connect: {
          // id: "609f2243006ce39200efe06c"
        // }
      // }
    // }
  // })
// 
  // await prisma.post.create({
    // data: {
      // title: "Prisma is a type-safe MongoDB client",
      // slug: "prisma-is-type-safe-mongodb-client",
      // body: "This is my second post.",
      // author: {
        // connect: {
          // email: "joseph.atureta@gmail.com"
        // }
      // }
    // },
  // })
// 
  // const posts = await prisma.post.findMany({})
  // console.dir(posts, { depth: Infinity })

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect)