import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Cool T-Shirt",
    price: 20,
    description:
      "肌触りの良いコットン素材で、一日中快適に過ごせる定番Tシャツ。",
  },
  {
    id: 2,
    name: "Awesome Mug",
    price: 15,
    description:
      "保温性に優れたセラミックマグ。お気に入りの飲み物が長く温かいまま。",
  },
  {
    id: 3,
    name: "Stylish Cap",
    price: 25,
    description:
      "UVカット機能付きで、タウンユースにもアウトドアにもぴったりのキャップ。",
  },
  {
    id: 4,
    name: "Trendy Sneakers",
    price: 50,
    description:
      "軽量ソールと通気性の良いメッシュが足元を快適に保つスニーカー。",
  },
  {
    id: 5,
    name: "Pop T-Shirt",
    price: 20,
    description:
      "鮮やかなグラフィックが目を引く、週末のお出かけに最適なTシャツ。",
  },
  {
    id: 6,
    name: "Vintage Jeans",
    price: 8000,
    description:
      "クラシックな色落ち加工で、使い込むごとに味が出るヴィンテージデニム。",
  },
  {
    id: 7,
    name: "Classic Hoodie",
    price: 6000,
    description:
      "柔らかな裏起毛が体を包む、季節の変わり目にも活躍するパーカー。",
  },
  {
    id: 8,
    name: "Sporty Socks",
    price: 1500,
    description: "吸汗速乾素材を使用し、トレーニング中も足元を爽やかにキープ。",
  },
  {
    id: 9,
    name: "Minimalist Backpack",
    price: 12000,
    description:
      "荷物を整理しやすい多機能ポケット搭載のミニマルデザインバックパック。",
  },
  {
    id: 10,
    name: "Comfy Sweatpants",
    price: 5000,
    description: "伸縮性のあるウエストと柔らかな生地でリラックスタイムに最適。",
  },
  {
    id: 11,
    name: "Wireless Earbuds",
    price: 10000,
    description:
      "高音質ドライバー搭載、ノイズキャンセル対応の完全ワイヤレスイヤホン。",
  },
  {
    id: 12,
    name: "Smart Water Bottle",
    price:4500,
    description:
      "飲水リマインダー機能付きで、水分補給を忘れがちな方におすすめ。",
  },
  {
    id: 13,
    name: "Ergonomic Mouse",
    price: 3500,
    description:
      "手首への負担を軽減するエルゴノミクスデザインのワイヤレスマウス。",
  },
];

app.get("/catalogue", (c) => {
  return c.json(products);
});

app.get("/catalogue/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const product = products.find((p) => p.id === id);
  if (!product) {
    return c.notFound();
  }
  return c.json(product);
});

app.post("/catalogue", async (c) => {
  let body: unknown;

  try {
    body = await c.req.json();
  } catch {
    return c.json({ message: "Invalid JSON body." }, 400);
  }

  if (!body || typeof body !== "object") {
    return c.json({ message: "Invalid JSON body." }, 400);
  }

  const payload = body as Record<string, unknown>;
  const name = payload.name;
  const price = payload.price;
  const description = payload.description;

  if (
    typeof name !== "string" ||
    typeof price !== "number" ||
    typeof description !== "string"
  ) {
    return c.json(
      {
        message:
          "Request body must include string fields name, description and numeric fields price",
      },
      400
    );
  }

  const nextId =
    products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;

  const newProduct: Product = {
    id: nextId,
    name,
    price,
    description,
  };

  products.push(newProduct);

  return c.json(newProduct, 201);
});

serve(
  {
    fetch: app.fetch,
    hostname: "0.0.0.0",
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
