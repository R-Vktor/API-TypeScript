// Este é o arquivo que contém a isnstancia do prisma, 
// ele esta funcionando como uma especie de padrao sigleton,
// para impedir que o banco seja instanciado mais de 
// uma vez

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
