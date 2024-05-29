import { PrismaClient, Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"
import bcrypt from "bcryptjs"
const prisma = new PrismaClient()

const adminData = [
  {
    username: "winyh",
    email: faker.internet.email(),
    mobile: "18672377828",
    password: bcrypt.hashSync("123456", 10),
    token: faker.string.hexadecimal({ length: 16 }),
    avator: faker.image.avatar(),
    status: "1"
  }
]

const recordData = {
  username: "柳伯虎", // faker.internet.userName()
  mobile: "18672377828", // faker.phone.number()
  company: "航空港控股", // faker.company.buzzPhrase()
  industry: "商业地产", // faker.word.words(5)
  scale: faker.string.numeric(5),
  start: "2024年5月", // faker.word.words(5)
  area: "3000平", // faker.string.numeric(5)
  person: "1000", // faker.string.numeric(5)
  focus: "交通和配套设施及物业是否完善", // faker.word.words(5)
  status: faker.helpers.arrayElement(["0", "1", "2"]),
  mark: "客户投资意向很强" // faker.word.words(5)
}

async function main() {
  console.log(`Start seeding ...`)
  for (const u of adminData) {
    const admin = await prisma.admin.create({
      data: u
    })
    console.log(`Created admin with id: ${admin.id}`)
  }

  const record = await prisma.record.create({
    data: recordData
  })
  console.log(`Created admin with id: ${record.id}`)

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
