from fastmcp import FastMCP

mcp = FastMCP(name="Revenue", host="0.0.0.0", port=8080)

products = [
    {
        "id": 1,
        "name": "Cool T-Shirt",
        "price": 3000,
        "description": "肌触りの良いコットン素材で、一日中快適に過ごせる定番Tシャツ。",
    },
    {
        "id": 4,
        "name": "Trendy Sneakers",
        "price": 7500,
        "description": "軽量ソールと通気性の良いメッシュが足元を快適に保つスニーカー。",
    },
    {
        "id": 7,
        "name": "Classic Hoodie",
        "price": 6000,
        "description": "柔らかな裏起毛が体を包む、季節の変わり目にも活躍するパーカー。",
    },
    {
        "id": 11,
        "name": "Wireless Earbuds",
        "price": 10000,
        "description": "高音質ドライバー搭載、ノイズキャンセル対応の完全ワイヤレスイヤホン。",
    },
    {
        "id": 2,
        "name": "Awesome Mug",
        "price": 1500,
        "description": "保温性に優れたセラミックマグ。お気に入りの飲み物が長く温かいまま。",
    },
    {
        "id": 12,
        "name": "Smart Water Bottle",
        "price": 4500,
        "description": "飲水リマインダー機能付きで、水分補給を忘れがちな方におすすめ。",
    },
    {
        "id": 6,
        "name": "Vintage Jeans",
        "price": 8000,
        "description": "クラシックな色落ち加工で、使い込むごとに味が出るヴィンテージデニム。",
    },
    {
        "id": 3,
        "name": "Stylish Cap",
        "price": 4000,
        "description": "UVカット機能付きで、タウンユースにもアウトドアにもぴったりのキャップ。",
    },
    {
        "id": 8,
        "name": "Sporty Socks",
        "price": 1500,
        "description": "吸汗速乾素材を使用し、トレーニング中も足元を爽やかにキープ。",
    },
    {
        "id": 5,
        "name": "Pop T-Shirt",
        "price": 3500,
        "description": "鮮やかなグラフィックが目を引く、週末のお出かけに最適なTシャツ。",
    },
    {
        "id": 10,
        "name": "Comfy Sweatpants",
        "price": 5000,
        "description": "伸縮性のあるウエストと柔らかな生地でリラックスタイムに最適。",
    },
    {
        "id": 9,
        "name": "Minimalist Backpack",
        "price": 12000,
        "description": "荷物を整理しやすい多機能ポケット搭載のミニマルデザインバックパック。",
    },
    {
        "id": 13,
        "name": "Ergonomic Mouse",
        "price": 3500,
        "description": "手首への負担を軽減するエルゴノミクスデザインのワイヤレスマウス。",
    },
]


@mcp.tool(
    name="get-products-order-by-revenue",
    title="get-products-order-by-revenue",
    description="指定した順位まで製品情報を返却します。返却された製品情報は売上の上位順に並んでいます。",
)
def revenue(n: int) -> list[dict[str, any]]:
    return products[:n]


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
