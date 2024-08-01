export interface IRestaurant {
  id: number;
  name: string;
  type: string;
  phone: string;
  timeOpen: string;
  day: string;
  image: string;
  detail: string;
}

export const restaurants: Array<IRestaurant> = [
  {
    id: 1,
    name: "ลา ดอลเช่ วีต้า (La Dolce Vita)",
    type: "อิตาเลียน",
    phone: "123456789",
    timeOpen: "7:00 - 10:00 pm",
    day: "Open every day",
    image: "https://via.placeholder.com/150",
    detail: `
        <p><strong>ที่ตั้ง:</strong> ตั้งอยู่ใจกลางเมืองบนถนนสุขุมวิท ซอย 24 กรุงเทพมหานคร</p>
        <h2>บรรยากาศ:</h2>
        <p>ร้านตกแต่งสไตล์อิตาเลียนดั้งเดิม ให้บรรยากาศอบอุ่นและโรแมนติก ด้วยแสงไฟนวลและเพลงบรรเลงเบาๆ ภายในร้านมีการจัดวางโต๊ะอย่างเป็นระเบียบ พร้อมด้วยผ้าปูโต๊ะลายตารางสีแดงขาวและแจกันดอกไม้สดที่ทุกโต๊ะ</p>
        <h2>เมนูอาหาร:</h2>
        <p>ร้าน ลา ดอลเช่ วีต้า นำเสนอเมนูอาหารอิตาเลียนแท้ ๆ โดยมีเชฟชาวอิตาเลียนที่มีประสบการณ์มากกว่า 15 ปีคอยปรุงอาหารให้ทุกจาน เมนูเด่นๆ ประกอบด้วย:</p>
        <ul>
            <li>พิซซ่าอบด้วยเตาถ่าน (Wood-fired Pizza)</li>
            <li>พาสต้าเส้นสด (Fresh Pasta)</li>
            <li>ลาซานญ่าผักโขมและริคอตต้า (Spinach and Ricotta Lasagna)</li>
            <li>สเต็กเนื้อทอสคานา (Tuscan Steak)</li>
            <li>ทิรามิสุโฮมเมด (Homemade Tiramisu)</li>
        </ul>
        <h2>เครื่องดื่ม:</h2>
        <p>ร้านมีเครื่องดื่มหลากหลายให้เลือก รวมถึงไวน์อิตาเลียนระดับพรีเมียม ค็อกเทลสูตรพิเศษ และกาแฟเอสเพรสโซ่แท้ๆ</p>
        <h2>บริการ:</h2>
        <p>บริการที่นี่เป็นเลิศ พนักงานยิ้มแย้มแจ่มใสและมีความรู้เกี่ยวกับเมนูอาหารและเครื่องดื่ม พร้อมให้คำแนะนำและบริการด้วยความสุภาพ</p>
        `,
  },
  {
    id: 2,
    name: "Restaurant France",
    type: "French",
    phone: "02-345-6789",
    timeOpen: "7:00 PM - 10:00 PM",
    day: "Monday - Friday",
    image: "https://example.com/image_france.jpg",
    detail:
      "Restaurant France provides a sophisticated French dining experience. Our menu features classic French cuisine made with fresh, high-quality ingredients.",
  },
  {
    id: 3,
    name: "Restaurant China",
    type: "Chinese",
    phone: "02-234-5678",
    timeOpen: "5:00 PM - 10:00 PM",
    day: "Everyday",
    image: "https://example.com/image_china.jpg",
    detail:
      "Restaurant China offers an authentic Chinese dining experience with a wide variety of traditional dishes. Enjoy our cozy ambiance and friendly service.",
  },
];
