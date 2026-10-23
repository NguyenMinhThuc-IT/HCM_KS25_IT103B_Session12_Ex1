/**
 * DO VET & SUA LOI DIEU KIEN BIEN THOI GIAN AN HAN THANH TOAN THUE BAO (GRACE PERIOD)
 * File name: solution_ex1.js
 * 
 * PHAN TICH LOI KY THUAT & CO CHE DIEU KIEN BIEN:
 * ----------------------------------------------------------------------------------
 * 1. Nguyen nhan loi trong ma nguon cu:
 *    - Trong ma nguon cu, cau truc re nhanh kiem tra: `if (sub.daysOverdue >= 3)`
 *      dieu nay dan den viec ngay thu 3 (`daysOverdue = 3`) da bi ap dung hinh thuc
 *      ha cap ve goi FREE va chuyen trang thai thanh EXPIRED.
 *    - Dieu nay sai so voi chinh sach nghiep vu: "Neu no cuoc trong vong 3 ngay dau, 
 *      trang thai la GRACE_PERIOD. Neu tu ngay thu 4 tro di (daysOverdue > 3) moi ha cap".
 * 
 * 2. Giai phap khac phuc:
 *    - Sua dieu kien kiem tra thanh `sub.daysOverdue > 3` (hoac `sub.daysOverdue >= 4`) 
 *      de dam bảo cac thue bao co so ngay no cuoc tu 1 den 3 ngay van duoc giu nguyen 
 *      o trang thai ân han (GRACE_PERIOD) va chi ha cap khi so ngay no cuoc thuc su vuot qua 3 ngay.
 * 
 * BANG TEST CASES DOI CHUNG:
 * +----+------------------------------+---------------------------+---------------------------+---------------------------+
 * | STT| Truong hop kiem thu          | Du lieu dau vao           | Ket qua sai thuc te       | Ket qua dung mong đợi     |
 * +----+------------------------------+---------------------------+---------------------------+---------------------------+
 * | 01 | Thue bao no cuoc 3 ngay      | daysOverdue: 3            | Ha cap FREE, status EXPIRED| Trang thai GRACE_PERIOD   |
 * | 02 | Thue bao no cuoc 4 ngay      | daysOverdue: 4            | Ha cap FREE, status EXPIRED| Ha cap FREE, status EXPIRED|
 * +----+------------------------------+---------------------------+---------------------------+---------------------------+
 */


// 1. KHOI TAO DU LIEU THUE BAO SAAS BAN DAU
const subscriptions = [
  { 
    subscriptionId: "SUB-001", 
    customerName: "Nguyen Van An", 
    planTier: "FAMILY", 
    deviceLimit: 5, 
    daysOverdue: 3, 
    status: "ACTIVE" 
  },
  { 
    subscriptionId: "SUB-002", 
    customerName: "Tran Thi Mai", 
    planTier: "FAMILY", 
    deviceLimit: 5, 
    daysOverdue: 4, 
    status: "ACTIVE" 
  },
  {
    subscriptionId: "SUB-003",
    customerName: "Le Van Binh",
    planTier: "PREMIUM",
    deviceLimit: 4,
    daysOverdue: 1,
    status: "ACTIVE"
  }
];

// 2. HAM KIEM TRA VA AP DUNG CHINH SACH AN HAN (DA SUA LOI DIEU KIEN BIEN)
const auditSubscriptions = (list) => {
  for (let i = 0; i < list.length; i++) {
    const sub = list[i];
    
    if (sub.daysOverdue > 0) {
      // Sua dieu kien tu >= 3 thanh > 3 de dung voi nghiep vu trong vong 3 ngay dau
      if (sub.daysOverdue > 3) {
        sub.planTier = "FREE";
        sub.deviceLimit = 1;
        sub.status = "EXPIRED";
      } else {
        sub.status = "GRACE_PERIOD";
      }
    } else {
      sub.status = "ACTIVE";
    }
  }
};

// 3. HAM IN BAO CAO TABULAR CONSOLE
const printSubscriptionReport = (list, title = "BAO CAO KIEM TOAN THUE BAO SAAS") => {
  const borderLine = "-".repeat(85);
  console.log("\n" + borderLine);
  console.log(`                 ${title.toUpperCase()}                 `);
  console.log(borderLine);
  console.log(
    "MA SUB".padEnd(12) +
    "TEN KHACH HANG".padEnd(20) +
    "GOI CUOC".padEnd(12) +
    "GIOI HAN TB".padEnd(14) +
    "SO NGAY NO".padEnd(14) +
    "TRANG THAI"
  );
  console.log(borderLine);

  for (let i = 0; i < list.length; i++) {
    const sub = list[i];
    const colId = sub.subscriptionId.padEnd(12);
    const colName = sub.customerName.padEnd(20);
    const colPlan = sub.planTier.padEnd(12);
    const colLimit = (sub.deviceLimit.toString() + " thiet bi").padEnd(14);
    const colOverdue = (sub.daysOverdue.toString() + " ngay").padEnd(14);
    const colStatus = sub.status;

    console.log(`${colId}${colName}${colPlan}${colLimit}${colOverdue}${colStatus}`);
  }

  console.log(borderLine);
  console.log(`TONG SO THUE BAO KHAO SAT: ${list.length.toString().padStart(8)} thue bao`);
  console.log(borderLine);
};

// 4. CHAY THU NGHIEM KIEM DUYET
console.log("================================================");
console.log("TRANG THAI TRUOC KHI KIEM TOAN (AUDIT)");
console.log("================================================");
printSubscriptionReport(subscriptions, "Danh sach truoc audit");

// Thuc thi kiem toan lai dieu kien bien
auditSubscriptions(subscriptions);

console.log("\n================================================");
console.log("TRANG THAI SAU KHI KIEM TOAN (DA SUA LOI DIEU KIEN BIEN)");
console.log("================================================");
printSubscriptionReport(subscriptions, "Danh sach sau khi audit");