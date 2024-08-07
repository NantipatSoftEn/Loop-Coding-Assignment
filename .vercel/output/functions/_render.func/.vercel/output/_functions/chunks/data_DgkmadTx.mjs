const restaurants = [
  {
    id: 1,
    name: "ลา ดอลเช่ วีต้า (La Dolce Vita)",
    type: "อิตาเลียน",
    phone: "123456789",
    time: { open: "7:00PM", close: "10:00 PM" },
    day: "Open everyday",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
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
        `
  },
  {
    id: 2,
    name: "Restaurant France",
    type: "French",
    phone: "02-345-6789",
    time: { open: "5:00PM", close: "10:00 PM" },
    day: "Open everyday",
    image: "https://img-service-v3.hungryhub.com/pr:sharp/rs:fill:0:0:0/g:ce/aHR0cHM6Ly9pbWFnZXMuaHVuZ3J5aHViLmNvbS91cGxvYWRzL3Jlc3RhdXJhbnRzLzMwMDUvcGhvdG9zLzEzMTgxNS9SYWNrTXVsdGlwYXJ0MjAyNDA1MTYtMTQzLWxwdTkxcS5qcGc=.webp",
    detail: "Restaurant France provides a sophisticated French dining experience. Our menu features classic French cuisine made with fresh, high-quality ingredients."
  },
  {
    id: 3,
    name: "Restaurant China",
    type: "Chinese",
    phone: "02-234-5678",
    time: { open: "7:00PM", close: "10:00 PM" },
    day: "Open Monday - Friday",
    image: "https://img-service-v3.hungryhub.com/pr:sharp/rs:fill:0:0:0/g:ce/aHR0cHM6Ly9pbWFnZXMuaHVuZ3J5aHViLmNvbS91cGxvYWRzL3Jlc3RhdXJhbnRzLzE2ODQvcGhvdG9zLzEzNzcyOC9SYWNrTXVsdGlwYXJ0MjAyNDA3MjQtMTQ0LXJmYTg0ZC5qcGc=.webp",
    detail: "Restaurant China offers an authentic Chinese dining experience with a wide variety of traditional dishes. Enjoy our cozy ambiance and friendly service."
  }
];

export { restaurants as r };
