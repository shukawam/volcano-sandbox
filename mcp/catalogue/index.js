const express = require("express")

const app = express()
const port = 3000

app.use(express.json())

const products = [
    {
        id: 1,
        name: 'Cool T-Shirt',
        price: 20,
        imageUrl: '/images/cool-t-shirt.jpeg',
        description: '肌触りの良いコットン素材で、一日中快適に過ごせる定番Tシャツ。',
        quantity: 42,
    },
    {
        id: 2,
        name: 'Awesome Mug',
        price: 15,
        imageUrl: '/images/awesome-mug.jpeg',
        description: '保温性に優れたセラミックマグ。お気に入りの飲み物が長く温かいまま。',
        quantity: 60,
    },
    {
        id: 3,
        name: 'Stylish Cap',
        price: 25,
        imageUrl: '/images/stylish-cap.jpeg',
        description: 'UVカット機能付きで、タウンユースにもアウトドアにもぴったりのキャップ。',
        quantity: 33,
    },
    {
        id: 4,
        name: 'Trendy Sneakers',
        price: 50,
        imageUrl: '/images/trendy-sneakers.jpeg',
        description: '軽量ソールと通気性の良いメッシュが足元を快適に保つスニーカー。',
        quantity: 18,
    },
    {
        id: 5,
        name: 'Pop T-Shirt',
        price: 20,
        imageUrl: '/images/pop-t-shirt.jpeg',
        description: '鮮やかなグラフィックが目を引く、週末のお出かけに最適なTシャツ。',
        quantity: 55,
    },
    {
        id: 6,
        name: 'Vintage Jeans',
        price: 60,
        imageUrl: '/images/vintage-jeans.jpeg',
        description: 'クラシックな色落ち加工で、使い込むごとに味が出るヴィンテージデニム。',
        quantity: 27,
    },
    {
        id: 7,
        name: 'Classic Hoodie',
        price: 45,
        imageUrl: '/images/classic-hoodie.jpeg',
        description: '柔らかな裏起毛が体を包む、季節の変わり目にも活躍するパーカー。',
        quantity: 36,
    },
    {
        id: 8,
        name: 'Sporty Socks',
        price: 10,
        imageUrl: '/images/sporty-socks.jpeg',
        description: '吸汗速乾素材を使用し、トレーニング中も足元を爽やかにキープ。',
        quantity: 120,
    },
    {
        id: 9,
        name: 'Minimalist Backpack',
        price: 70,
        imageUrl: '/images/minimalist-backpack.jpeg',
        description: '荷物を整理しやすい多機能ポケット搭載のミニマルデザインバックパック。',
        quantity: 22,
    },
    {
        id: 10,
        name: 'Comfy Sweatpants',
        price: 35,
        imageUrl: '/images/comfy-sweatpants.jpeg',
        description: '伸縮性のあるウエストと柔らかな生地でリラックスタイムに最適。',
        quantity: 48,
    },
    {
        id: 11,
        name: 'Wireless Earbuds',
        price: 80,
        imageUrl: '/images/wireless-earbuds.jpeg',
        description: '高音質ドライバー搭載、ノイズキャンセル対応の完全ワイヤレスイヤホン。',
        quantity: 15,
    },
    {
        id: 12,
        name: 'Smart Water Bottle',
        price: 30,
        imageUrl: '/images/smart-water-bottle.jpeg',
        description: '飲水リマインダー機能付きで、水分補給を忘れがちな方におすすめ。',
        quantity: 75,
    },
    {
        id: 13,
        name: 'Ergonomic Mouse',
        price: 25,
        imageUrl: '/images/ergonomic-mouse.jpeg',
        description: '手首への負担を軽減するエルゴノミクスデザインのワイヤレスマウス。',
        quantity: 40,
    },
];

app.get('/catalogue', (req, res) => {
    res.status(200).json(products);
});

app.get('/catalogue/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const product = products.filter(item => item.id === id);
    console.log(product)
    res.status(200).json(product)
});

app.listen(port, () => {
    console.log(`Carts service listening at http://localhost:${port}`);
});

