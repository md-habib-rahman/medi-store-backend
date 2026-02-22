// src/app.ts
import express8 from "express";

// src/modules/medicine/medicine.router.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Categories {\n  id        String      @id @default(uuid())\n  adminId   String\n  title     String      @db.VarChar(225)\n  createdAt DateTime    @default(now())\n  updatedAt DateTime    @updatedAt\n  medicines Medicines[]\n\n  @@index([adminId])\n}\n\nmodel Medicines {\n  id                String       @id @default(ulid())\n  categoryId        String\n  category          Categories   @relation(fields: [categoryId], references: [id])\n  generic           String\n  sellerId          String\n  seller            User         @relation(fields: [sellerId], references: [id])\n  title             String       @db.VarChar(225)\n  manufacturer      String\n  price             Int\n  availableQuantity Int          @default(0)\n  details           String       @db.Text\n  isAvailable       Boolean      @default(true)\n  thumbnail         String\n  orderItems        OrderItems[]\n  createdAt         DateTime     @default(now())\n  updatedAt         DateTime     @updatedAt\n\n  @@index([sellerId])\n  @@index([categoryId])\n}\n\nmodel Orders {\n  id              String       @id @default(ulid())\n  customerId      String\n  sellerId        String\n  orderStatus     OrderStatus  @default(PENDING)\n  shippingAddress String?\n  totalPrice      Int          @default(0)\n  items           OrderItems[]\n  review          Reviews?\n  createdAt       DateTime     @default(now())\n  updatedAt       DateTime     @updatedAt\n\n  @@index([customerId])\n}\n\nmodel OrderItems {\n  id         String    @id @default(ulid())\n  orderId    String\n  order      Orders    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicines @relation(fields: [medicineId], references: [id], onDelete: Restrict)\n  quantity   Int\n  unitPrice  Int\n  createdAt  DateTime  @default(now())\n  updatedAt  DateTime  @updatedAt\n\n  @@unique([orderId, medicineId])\n  @@index([orderId])\n  @@index([medicineId])\n}\n\nmodel Reviews {\n  id String @id @default(uuid())\n\n  orderId String       @unique\n  order   Orders       @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  status  ReviewStatus @default(PUBLISHED)\n  comment String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([orderId])\n}\n\nenum ReviewStatus {\n  PUBLISHED\n  DRAFT\n}\n\nenum OrderStatus {\n  PENDING\n  RECEIVED\n  SHIPPED\n  DELIVERED\n}\n\nmodel User {\n  id            String      @id\n  name          String\n  email         String\n  emailVerified Boolean     @default(false)\n  image         String?\n  createdAt     DateTime    @default(now())\n  updatedAt     DateTime    @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  status        String?     @default("ACTIVE")\n  role          String?     @default("CUSTOMER")\n  medicines     Medicines[]\n\n  phone   String?\n  address String?\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Jwks {\n  id         String    @id\n  publicKey  String\n  privateKey String\n  createdAt  DateTime\n  expiresAt  DateTime?\n\n  @@map("jwks")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"adminId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicines","relationName":"CategoriesToMedicines"}],"dbName":null},"Medicines":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMedicines"},{"name":"generic","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicinesToUser"},{"name":"title","kind":"scalar","type":"String"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"availableQuantity","kind":"scalar","type":"Int"},{"name":"details","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"orderItems","kind":"object","type":"OrderItems","relationName":"MedicinesToOrderItems"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Orders":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"orderStatus","kind":"enum","type":"OrderStatus"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Int"},{"name":"items","kind":"object","type":"OrderItems","relationName":"OrderItemsToOrders"},{"name":"review","kind":"object","type":"Reviews","relationName":"OrdersToReviews"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItems":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Orders","relationName":"OrderItemsToOrders"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicines","relationName":"MedicinesToOrderItems"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Orders","relationName":"OrdersToReviews"},{"name":"status","kind":"enum","type":"ReviewStatus"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"status","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicines","relationName":"MedicinesToUser"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Jwks":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"publicKey","kind":"scalar","type":"String"},{"name":"privateKey","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"expiresAt","kind":"scalar","type":"DateTime"}],"dbName":"jwks"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/medicine/medicine.service.ts
var getAllMedicine = async ({
  page,
  limit,
  skip,
  sellerId,
  categoryId,
  sortBy,
  sortOrder,
  id,
  manufacturer,
  maxprice
}) => {
  let where = {};
  if (sellerId) {
    where.sellerId = sellerId;
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (manufacturer) {
    where.manufacturer = manufacturer;
  }
  if (id) {
    where.id = id;
  }
  if (maxprice) {
    where.price = {
      lte: maxprice
    };
  }
  const allMedicine = await prisma.medicines.findMany({
    take: limit,
    skip,
    where,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    include: {
      category: {
        select: {
          title: true
        }
      },
      seller: {
        select: {
          name: true
        }
      }
    }
  });
  const total = await prisma.medicines.count({
    where
  });
  return {
    data: allMedicine,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var medicineService = {
  getAllMedicine
};

// src/helper/paginationHelper.ts
var paginationHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationHelper_default = paginationHelper;

// src/modules/medicine/medicine.controller.ts
var getAllMedicine2 = async (req, res) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
    const maxprice = Number(req?.query?.maxprice);
    const sellerId = req?.query?.sellerId;
    const categoryId = req.query.categoryId;
    const manufacturer = req.query.manufacturer;
    const id = req.query.id;
    const result = await medicineService.getAllMedicine({ page, limit, skip, sellerId, categoryId, sortBy, sortOrder, id, manufacturer, maxprice });
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Error in fetching Medicines Data!",
      details: err
    });
  }
};
var medicineController = {
  getAllMedicine: getAllMedicine2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { jwt } from "better-auth/plugins";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: ["https://medi-store-client-gamma.vercel.app", "https://rumedi-server.mdhabib.me", "http://localhost:3000"],
  plugins: [
    jwt({
      jwt: {
        expirationTime: "7d"
      }
    })
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 3600
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: true,
    crossSubDomainCookies: {
      enabled: false
      // domain: "vercel.app",
    },
    disableCSRFCheck: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      address: {
        type: "string",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Medi Store" <noreply@medistore.com>',
          to: user.email,
          subject: "Email Verifacation - Medi Store",
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email - Medi Store</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#2e7d32; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">Medi Store</h1>
              <p style="color:#e8f5e9; margin:5px 0 0;">Your trusted healthcare partner</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#333333; margin-top:0;">Verify Your Email Address</h2>
              
              <p style="color:#555555; font-size:15px; line-height:1.6;">
                Thank you for signing up with <strong>Medi Store</strong>.
                To complete your registration and keep your account secure, please verify your email address.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href= ${verificationUrl}
                   style="background-color:#2e7d32; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="color:#555555; font-size:14px; line-height:1.6;">
                If the button above doesn\u2019t work, copy and paste the link below into your browser:
              </p>

              <p style="word-break:break-all; font-size:13px; color:#2e7d32;">
                ${verificationUrl}
              </p>

              <p style="color:#777777; font-size:13px; line-height:1.6;">
                This link will expire in <strong>24 hours</strong> for security reasons.
              </p>

              <p style="color:#777777; font-size:13px; line-height:1.6;">
                If you didn\u2019t create an account with Medi Store, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f1f1f1; padding:20px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#888888;">
                \xA9 2026 Medi Store. All rights reserved.
              </p>
              <p style="margin:5px 0 0; font-size:12px; color:#888888;">
                Need help? Contact our support team anytime.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized!"
      });
    }
    if (!session.user.emailVerified) {
      return res.status(401).json({
        success: false,
        message: "Email verification required. Please verify your email!"
      });
    }
    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      status: session.user.status,
      emailVerified: session.user.emailVerified
    };
    if (req.user.status === "INACTIVE") {
      return res.status(403).json({
        success: false,
        message: `Account is ${req.user.status}. Access denied.`
      });
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "forbidden! You don't have permission to access this resources!"
      });
    }
    next();
  };
};

// src/modules/category/category.service.ts
var getAllCategory = async (id, page, limit, skip, sortBy, sortOrder) => {
  const result = await prisma.categories.findMany({
    take: limit,
    skip,
    where: {
      id
    },
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" }
  });
  const total = await prisma.categories.count({
    where: {
      id
    }
  });
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var createCategory = async (data, userId) => {
  const result = await prisma.categories.create({
    data: {
      ...data,
      adminId: userId
    }
  });
  return result;
};
var deleteCategory = async (id) => {
  const result = await prisma.categories.delete({
    where: {
      id
    }
  });
  return result;
};
var allCategoryWithoutPagination = async () => {
  const res = await prisma.categories.findMany({
    select: {
      id: true,
      title: true
    },
    orderBy: { title: "asc" }
  });
  return res;
};
var categoryService = {
  createCategory,
  getAllCategory,
  deleteCategory,
  allCategoryWithoutPagination
};

// src/modules/category/category.controller.ts
var getAllCategory2 = async (req, res) => {
  const { id } = req.query;
  try {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
    const result = await categoryService.getAllCategory(id, page, limit, skip, sortBy, sortOrder);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "There was an error fetching categories data!",
      details: err
    });
  }
};
var createCategory2 = async (req, res) => {
  try {
    const user = req.user;
    const result = await categoryService.createCategory(req.body, user?.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Category adding failed with error",
      details: err
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteCategory(id);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({
      error: "Category deleting failed with error",
      details: err
    });
  }
};
var allCategoryWithoutPagination2 = async (req, res) => {
  try {
    const result = await categoryService.allCategoryWithoutPagination();
    return res.status(200).json({ data: result });
  } catch (err) {
    return err;
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2,
  deleteCategory: deleteCategory2,
  allCategoryWithoutPagination: allCategoryWithoutPagination2
};

// src/modules/medicine/medicine.router.ts
var router = express.Router();
router.get("/", medicineController.getAllMedicine);
router.delete("/:id", auth2("ADMIN" /* ADMIN */), categoryController.deleteCategory);
var medicineRouter = router;

// src/modules/category/category.router.ts
import express2 from "express";
var router2 = express2.Router();
router2.get("/all", categoryController.allCategoryWithoutPagination);
router2.post("/", auth2("ADMIN" /* ADMIN */), categoryController.createCategory);
router2.get("/", categoryController.getAllCategory);
router2.delete("/:id", auth2("ADMIN" /* ADMIN */), categoryController.deleteCategory);
var categoryRouter = router2;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/user/user.router.ts
import express3 from "express";

// src/modules/user/user.service.ts
var updateImage = async ({ id, imageUrl }) => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data: {
      image: imageUrl
    }
  });
  return result;
};
var updateUserInfo = async (id, payload) => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  console.log(result);
  return result;
};
var userService = {
  updateImage,
  updateUserInfo
};

// src/modules/user/user.controller.ts
var getCurrentUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Please login!"
    });
  }
  try {
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var updateImage2 = async (req, res) => {
  const { id } = req.user;
  const { userId } = req.params;
  const { imageUrl } = req.body;
  if (id !== userId) {
    return res.status(403).json({
      success: false,
      error: "Forbidden"
    });
  }
  try {
    const result = await userService.updateImage({ id, imageUrl });
    console.log(result);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var updateUserInfo2 = async (req, res) => {
  const { id } = req.user;
  const { userId } = req.params;
  if (id !== userId) {
    return res.status(403).json({
      success: false,
      error: "Forbidden"
    });
  }
  try {
    const result = await userService.updateUserInfo(id, req.body);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var userController = {
  getCurrentUser,
  updateImage: updateImage2,
  updateUserInfo: updateUserInfo2
};

// src/modules/user/user.router.ts
var router3 = express3.Router();
router3.get("/", auth2("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */), userController.getCurrentUser);
router3.patch("/updateImage/:userId", auth2("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */), userController.updateImage);
router3.put("/updateUser/:userId", auth2("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */), userController.updateUserInfo);
var UserRouter = router3;

// src/modules/orders/order.router.ts
import express4 from "express";

// src/modules/orders/orders.services.ts
var getSingleOrder = async (userId, orderId, userRole) => {
  if (!userId || !orderId) {
    return null;
  }
  const condition = userRole === "CUSTOMER" /* CUSTOMER */ ? { id: orderId, customerId: userId } : { id: orderId, sellerId: userId };
  const order = await prisma.orders.findFirst({
    where: condition,
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
  return order;
};
var createOrder = async (customerId, payload) => {
  const { shippingAddress, items, deliveryFee } = payload;
  return prisma.$transaction(async (tx) => {
    let orderPrice = 0;
    const medicineIds = items.map((i) => i.medicineId);
    const medicines = await tx.medicines.findMany({
      where: {
        id: { in: medicineIds }
      }
    });
    if (!medicines || medicines.length === 0) throw new Error("No medicines found");
    const sellerId = medicines[0]?.sellerId;
    if (!sellerId) throw new Error("Seller not found");
    const orderItems = items.map((item) => {
      const medicine = medicines.find(
        (m) => m.id === item.medicineId
      );
      orderPrice += medicine.price * item.quantity;
      return {
        medicineId: medicine.id,
        quantity: item.quantity,
        unitPrice: medicine.price
      };
    });
    orderPrice += deliveryFee;
    const order = await tx.orders.create({
      data: {
        customerId,
        shippingAddress,
        sellerId,
        totalPrice: orderPrice,
        items: {
          createMany: {
            data: orderItems
          }
        }
      }
    });
    await Promise.all(
      orderItems.map(
        (item) => tx.medicines.update({
          where: { id: item.medicineId },
          data: {
            availableQuantity: {
              decrement: item.quantity
            }
          }
        })
      )
    );
    return order;
  });
};
var getOrders = async ({
  page,
  limit,
  skip,
  sellerId,
  customerId,
  sortBy,
  sortOrder,
  orderId
}) => {
  let where = {};
  if (sellerId) {
    where.sellerId = sellerId;
  }
  if (customerId) {
    where.customerId = customerId;
  }
  if (orderId) {
    where.orderId = orderId;
  }
  const result = await prisma.orders.findMany({
    take: limit,
    skip,
    where,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    include: {
      items: {
        include: {
          medicine: {
            select: {
              id: true,
              title: true,
              thumbnail: true
            }
          }
        }
      },
      review: {
        select: {
          id: true,
          orderId: true,
          comment: true
        }
      }
    }
  });
  const total = await prisma.orders.count({
    where
  });
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var postReview = async (userId, payload) => {
  const ownOrder = await prisma.orders.findFirst({
    where: {
      id: payload.orderId,
      customerId: userId,
      orderStatus: "DELIVERED"
    }
  });
  if (!ownOrder) {
    return { success: false, message: "Order Not Found!" };
  }
  const res = await prisma.reviews.create({
    data: { ...payload }
  });
  return { success: true, res };
};
var orderService = {
  createOrder,
  getOrders,
  getSingleOrder,
  postReview
};

// src/modules/orders/orders.controller.ts
var getSingleOrder2 = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user?.id;
  const orderId = req.params?.id;
  const userRole = req.user?.role;
  try {
    const result = await orderService.getSingleOrder(userId, orderId, userRole);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Fetching order failed!",
      error: err.message
    });
  }
};
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const order = await orderService.createOrder(customerId, req.body);
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Your order has been failed!",
      error: err.message
    });
  }
};
var getOrders2 = async (req, res) => {
  let customerId;
  let sellerId;
  try {
    if (req?.user?.role === "CUSTOMER" /* CUSTOMER */) {
      customerId = req?.user?.id;
    }
    if (req?.user?.role === "SELLER" /* SELLER */) {
      sellerId = req?.user?.id;
    }
    const orderId = req?.query?.orderId;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
    const order = await orderService.getOrders({ sellerId, customerId, page, limit, skip, sortBy, sortOrder, orderId });
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Order fetching failed!",
      error: err
    });
  }
};
var postReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await orderService.postReview(userId, req?.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
    return res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Your review has been failed to post!",
      error: err.message
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getSingleOrder: getSingleOrder2,
  getOrders: getOrders2,
  postReview: postReview2
};

// src/modules/orders/order.router.ts
var router4 = express4.Router();
router4.post("/", auth2("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
router4.get("/", auth2("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */, "ADMIN" /* ADMIN */), orderController.getOrders);
router4.get("/:id", auth2("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */), orderController.getSingleOrder);
router4.post("/review", auth2("CUSTOMER" /* CUSTOMER */), orderController.postReview);
var orderRouter = router4;

// src/modules/seller/seller.router.ts
import express5 from "express";

// src/modules/seller/seller.service.ts
var createMedicine = async (data, userId) => {
  const result = await prisma.medicines.create({
    data: {
      ...data,
      sellerId: userId
    }
  });
  return result;
};
var updateMedicine = async (medicineId, userId, payload) => {
  const medicine = await prisma.medicines.findFirst({
    where: {
      id: medicineId,
      sellerId: userId
    }
  });
  if (!medicine) {
    throw new Error("Medicine not found in DB!");
  }
  const updateMedicine3 = await prisma.medicines.update({
    where: {
      id: medicineId
    },
    data: { ...payload }
  });
  return updateMedicine3;
};
var deleteMedicine = async (medicineId, userId) => {
  const medicine = await prisma.medicines.findFirst({
    where: {
      id: medicineId,
      sellerId: userId
    }
  });
  if (!medicine) {
    throw new Error("Medicine not found in DB!");
  }
  const result = await prisma.medicines.delete({
    where: {
      id: medicineId
    }
  });
  return result;
};
var updateOrderStatus = async (orderId, status, userId) => {
  const order = await prisma.orders.findFirst({
    where: {
      id: orderId,
      sellerId: userId
    }
  });
  if (!order) {
    throw new Error("Order not found!");
  }
  return await prisma.orders.update({
    where: { id: orderId },
    data: {
      orderStatus: status
    }
  });
};
var stockeUpdate = async (medicineId, userId, quantity) => {
  const medicine = await prisma.medicines.findFirst({
    where: {
      id: medicineId,
      sellerId: userId
    }
  });
  if (!medicine) {
    throw new Error("Order not found!");
  }
  return await prisma.medicines.update({
    where: { id: medicineId },
    data: {
      availableQuantity: quantity
    }
  });
};
var sellerService = {
  createMedicine,
  updateMedicine,
  deleteMedicine,
  updateOrderStatus,
  stockeUpdate
};

// src/modules/seller/seller.controller.ts
var createMedicine2 = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(403).json({
      error: "Unauthorized!"
    });
  }
  try {
    const result = await sellerService.createMedicine(req.body, user.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Medicine adding failed with error",
      details: err
    });
  }
};
var updateMedicine2 = async (req, res) => {
  const userId = req.user?.id;
  const medicineId = req.params.id;
  try {
    const result = await sellerService.updateMedicine(medicineId, userId, req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Medicine adding failed with error",
      details: err
    });
  }
};
var stockUpdate = async (req, res) => {
  const userId = req.user?.id;
  const medicineId = req.params.id;
  console.log(req.body);
  const quantity = req.body.quantity;
  try {
    const result = await sellerService.stockeUpdate(medicineId, userId, quantity);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Medicine adding failed with error",
      details: err
    });
  }
};
var deleteMedicine2 = async (req, res) => {
  const userId = req.user?.id;
  const medicineId = req.params.id;
  try {
    const result = await sellerService.deleteMedicine(medicineId, userId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Medicine adding failed with error",
      details: err
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  const { id } = req.params;
  const orderStatus = req.body.orderStatus;
  const userId = req.user.id;
  console.log({ id, orderStatus, userId });
  try {
    const result = await sellerService.updateOrderStatus(id, orderStatus, userId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Order update failed!",
      error: err
    });
  }
};
var sellerController = {
  createMedicine: createMedicine2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2,
  updateOrderStatus: updateOrderStatus2,
  stockUpdate
};

// src/modules/seller/seller.router.ts
var router5 = express5.Router();
router5.post("/medicines", auth2("SELLER" /* SELLER */), sellerController.createMedicine);
router5.put("/medicines/:id", auth2("SELLER" /* SELLER */), sellerController.updateMedicine);
router5.patch("/medicines/:id", auth2("SELLER" /* SELLER */), sellerController.stockUpdate);
router5.delete("/medicines/:id", auth2("SELLER" /* SELLER */), sellerController.deleteMedicine);
router5.patch("/orders/:id", auth2("SELLER" /* SELLER */), sellerController.updateOrderStatus);
var sellerRouter = router5;

// src/modules/admin/admin.router.ts
import express6 from "express";

// src/modules/admin/admin.service.ts
var getUsers = async ({ page, limit, skip, sortBy, sortOrder, id, email }) => {
  let where = {};
  if (id) {
    where.id = id;
  }
  if (email) {
    where.email = email;
  }
  const res = await prisma.user.findMany({
    take: limit,
    skip,
    where,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" }
  });
  const total = await prisma.user.count({
    where
  });
  return {
    data: res,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var updateUserStatus = async (userId, status) => {
  const update = prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status
    }
  });
  return update;
};
var updateUserRole = async (userId, role) => {
  const update = prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role
    }
  });
  return update;
};
var adminService = {
  getUsers,
  updateUserStatus,
  updateUserRole
};

// src/modules/admin/admin.controller.ts
var getUsers2 = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
  const id = req.query.id;
  const email = req.query.email;
  try {
    const users = await adminService.getUsers({ page, limit, skip, sortBy, sortOrder, id, email });
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error fetching users!",
      error: err
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const result = await adminService.updateUserStatus(id, status);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error updating user's status!",
      error: err
    });
  }
};
var updateUserRole2 = async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  try {
    const result = await adminService.updateUserRole(id, role);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error updating user's role!",
      error: err
    });
  }
};
var adminController = {
  getUsers: getUsers2,
  updateUserStatus: updateUserStatus2,
  updateUserRole: updateUserRole2
};

// src/modules/admin/admin.router.ts
var router6 = express6.Router();
router6.get("/users", auth2("ADMIN" /* ADMIN */), adminController.getUsers);
router6.patch("/users/:id", auth2("ADMIN" /* ADMIN */), adminController.updateUserStatus);
router6.patch("/users/role/:id", auth2("ADMIN" /* ADMIN */), adminController.updateUserRole);
var adminRouter = router6;

// src/modules/public/public.router.ts
import express7 from "express";

// src/modules/public/public.service.ts
var getManufacturers = async () => {
  const res = await prisma.medicines.findMany({
    select: {
      manufacturer: true
    },
    distinct: ["manufacturer"],
    orderBy: {
      manufacturer: "asc"
    }
  });
  return res;
};
var getSellerInfo = async ({ sellerId }) => {
  if (!sellerId) throw new Error("Seller ID is required");
  const res = await prisma.user.findUnique({
    where: {
      id: sellerId
    }
  });
  return res;
};
var getSellerMedicine = async ({ page, limit, skip, sortBy, sortOrder, maxprice, sellerId, categoryId, manufacturer }) => {
  let where = {};
  if (sellerId) {
    where.sellerId = sellerId;
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (manufacturer) {
    where.manufacturer = manufacturer;
  }
  if (maxprice) {
    where.price = {
      lte: maxprice
    };
  }
  const allMedicine = await prisma.medicines.findMany({
    take: limit,
    skip,
    where,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    include: {
      category: {
        select: {
          title: true
        }
      },
      seller: {
        select: {
          name: true
        }
      }
    }
  });
  const total = await prisma.medicines.count({
    where
  });
  return {
    data: allMedicine,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var publicService = {
  getManufacturers,
  getSellerInfo,
  getSellerMedicine
};

// src/modules/public/public.controller.ts
var getManufacturers2 = async (req, res) => {
  try {
    const result = await publicService.getManufacturers();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "There was an error fetching categories data!",
      details: err
    });
  }
};
var getSellerMedicine2 = async (req, res) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_default(req.query);
    const maxprice = Number(req?.query?.maxprice);
    const sellerId = req?.params?.sellerId;
    const categoryId = req.query.categoryId;
    const manufacturer = req.query.manufacturer;
    console.log({ page, limit, skip, sortBy, sortOrder, maxprice, sellerId, categoryId, manufacturer });
    const result = await publicService.getSellerMedicine({ page, limit, skip, sortBy, sortOrder, maxprice, sellerId, categoryId, manufacturer });
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "Error in fetching Medicines Data!",
      details: err
    });
  }
};
var getSellerInfo2 = async (req, res) => {
  try {
    const { sellerId } = req?.params;
    const result = await publicService.getSellerInfo({ sellerId });
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      error: "There was an error fetching seller data!",
      details: err
    });
  }
};
var publicController = {
  getManufacturers: getManufacturers2,
  getSellerInfo: getSellerInfo2,
  getSellerMedicine: getSellerMedicine2
};

// src/modules/public/public.router.ts
var router7 = express7.Router();
router7.get("/manufacturer", publicController.getManufacturers);
router7.get("/seller/:sellerId", publicController.getSellerInfo);
router7.get("/seller/:sellerId/all-medicine", publicController.getSellerMedicine);
var publicROuter = router7;

// src/middlewares/logger.ts
function logger(req, _res, next) {
  const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || req.socket.remoteAddress;
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  console.log(
    `[${timestamp}] origin: ${req.headers.origin} ${req.method} ${req.originalUrl} - IP: ${ip}`
  );
  next();
}

// src/app.ts
var app = express8();
app.use(
  cors({
    origin: ["https://medi-store-client-gamma.vercel.app", "https://rumedi-server.mdhabib.me"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express8.json());
app.use(logger);
app.use("/api/user", UserRouter);
app.use("/api/orders", orderRouter);
app.use("/api/seller/", sellerRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/admin", adminRouter);
app.use("/api", publicROuter);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have reached MediStore Backend",
    path: req.path
  });
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
