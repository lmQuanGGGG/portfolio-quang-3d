// src/app/data.ts

export const profile = {
  name: "LÊ MINH QUANG",
  role: "Software Engineer",
  bio: "Sinh viên tiêu biểu với tư duy lập trình sắc bén. Chuyên sâu về AI, Backend System và Mobile App. Luôn hướng tới các giải pháp công nghệ tối ưu và hiện đại.",
  // Thống kê ấn tượng
  stats: [
    { label: "GPA", value: "3.38/4.0" },
    { label: "Experience", value: "3+ Years" },
    { label: "Projects", value: "10+" },
    { label: "Certificates", value: "5" },
  ],
  skills: [
    "AI Prompt Engineering", 
    "Backend (.NET, Python, NextJS)", 
    "Database (MSSQL, MongoDB)", 
    "Mobile (Flutter)", 
    "DevOps (Docker, CI/CD)" 
  ],
  // Dữ liệu từ các chứng chỉ (Link Credly chuẩn)
  certificates: [
    {
      name: "Networking Basics",
      issuer: "Cisco Networking Academy",
      date: "Nov 25, 2025",
      desc: "Hiểu sâu về Network communication, protocols, địa chỉ IPv4/IPv6 và cấu hình Router bảo mật.",
      img: "/certs/netbasic.png",
      link: "https://www.credly.com/badges/111f8a0a-a519-41b1-ad9d-1ee43b475f5c/public_url" 
    },
    {
      name: "JavaScript Essentials 2",
      issuer: "Cisco & OpenEDG",
      date: "Nov 19, 2025",
      desc: "Lập trình hướng đối tượng (OOP), xử lý bất đồng bộ & cấu trúc dữ liệu nâng cao.",
      img: "/certs/js2.png",
      link: "https://www.credly.com/badges/9d55313c-e2e9-44de-a0d8-7aade520f757/public_url" 
    },
    {
      name: "JavaScript Essentials 1",
      issuer: "Cisco & OpenEDG",
      date: "Nov 19, 2025",
      desc: "Nền tảng vững chắc về cú pháp, tư duy thuật toán và lập trình JS căn bản.",
      img: "/certs/js1.png",
      link: "https://www.credly.com/badges/a6562cd7-04da-4b13-94ee-765b35c832f9/public_url"
    },
    {
      name: "English for IT 2 (B2 Level)",
      issuer: "Cisco Networking Academy",
      date: "Nov 19, 2025",
      desc: "Giao tiếp chuyên ngành mức độ cao, thuật ngữ Cloud & Network.",
      img: "/certs/eng2.png",
      link: "https://www.credly.com/badges/4505caaa-d015-4b4e-b24f-848214d4991a/public_url"
    },
    {
      name: "English for IT 1",
      issuer: "Cisco Networking Academy",
      date: "Nov 19, 2025",
      desc: "Tiếng Anh CNTT căn bản, giao tiếp và đọc hiểu tài liệu kỹ thuật.",
      img: "/certs/eng1.png",
      link: "https://www.credly.com/badges/7c50ac0d-265f-473a-9977-9606273ac689/public_url"
    }
  ],
  projects: [
    {
      title: "GameNect",
      desc: "Mạng xã hội dành riêng cho game thủ (Mobile App)",
      tech: "Flutter, UI/UX, Backend API",
      link: "https://github.com/lmQuanGGGG/GameNect",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI Training System",
      desc: "Hệ thống AI đề xuất kết nối người dùng cá nhân hóa",
      tech: "Python, Docker, Data Analysis",
      link: "https://github.com/lmQuanGGGG/gamenect_ai_training",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "QConcert",
      desc: "Nền tảng săn vé sự kiện trực tuyến",
      tech: ".NET, High Performance",
      link: "https://github.com/lmQuanGGGG/Qconcert",
      color: "from-orange-500 to-red-500"
    }
  ]
};

// --- NỘI DUNG BLOG CHI TIẾT (ĐÃ CẬP NHẬT LINK ẢNH UNSPLASH) ---
export const blogPosts = [
  { 
    id: 1, 
    title: "Java Memory: Stack, Heap & Memory Leaks", 
    category: "Java", 
    date: "2025-10-01", 
    readTime: "15 min",
    content: `
# Java Memory Management: Không chỉ là lý thuyết

Rất nhiều lập trình viên Java lâu năm vẫn mơ hồ về việc khi nào một biến nằm ở Stack, khi nào nằm ở Heap. Hiểu sai điều này dẫn đến việc tối ưu hóa sai lầm và các lỗi \`OutOfMemoryError\` khó chịu. Hôm nay, chúng ta sẽ "mổ xẻ" JVM để xem nó thực sự hoạt động như thế nào bên dưới lớp vỏ bọc.

![Java Memory](https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1000&auto=format&fit=crop)

## 1. Stack vs Heap: Sự khác biệt cốt lõi

Bộ nhớ trong Java không phải là một khối thống nhất. Nó được chia làm hai vùng chính với mục đích và cơ chế quản lý hoàn toàn khác nhau:

| Đặc điểm | Stack Memory (Ngăn xếp) | Heap Memory (Vùng nhớ Heap) |
|----------|-------------------------|-----------------------------|
| **Lưu trữ** | Biến cục bộ (Local variables), tham chiếu (object references), luồng thực thi (execution threads). | Các Object thực sự (\`new Customer()\`), Instance variables của class. |
| **Cơ chế** | LIFO (Last In First Out). Khi một hàm được gọi, một khối nhớ (stack frame) được đẩy vào. Khi hàm return, khối đó bị hủy ngay lập tức. | Phức tạp hơn. Object sống ở đây cho đến khi không còn ai tham chiếu tới nó nữa, lúc đó Garbage Collector (GC) mới vào cuộc. |
| **Tốc độ** | Cực nhanh (do truy cập tuần tự và quản lý bởi CPU). | Chậm hơn Stack (do phải cấp phát động, phân mảnh bộ nhớ và quy trình dọn dẹp của GC). |
| **Kích thước** | Nhỏ (thường vài MB mỗi thread). Dễ bị \`StackOverflowError\` nếu đệ quy sâu. | Lớn (vài GB, tùy cấu hình \`-Xmx\`). Dễ bị \`OutOfMemoryError\` nếu leak memory. |

### Ví dụ thực tế minh họa:

Hãy xem đoạn code sau và phân tích từng dòng một:

\`\`\`java
public class MemoryTest {
    public static void main(String[] args) {
        int id = 101; // (1) Primitive -> Lưu trực tiếp giá trị 101 trong Stack Frame của main()
        
        String name = "Quang"; // (2) Reference -> Biến 'name' nằm ở Stack, nhưng giá trị "Quang" nằm ở String Pool (trong Heap)
        
        Customer customer = new Customer(id, name); // (3) Object -> Toàn bộ object Customer nằm trong Heap. Biến 'customer' ở Stack chỉ giữ địa chỉ trỏ tới nó.
        
        process(customer);
    }

    private static void process(Customer c) {
        // Khi hàm process được gọi:
        // 1. Một Stack Frame mới cho process() được tạo ra.
        // 2. Biến tham chiếu 'c' được tạo mới trong frame này.
        // 3. 'c' copy địa chỉ từ 'customer'. Cả hai cùng trỏ vào MỘT object trong Heap.
        
        c.setActive(true); // Thay đổi trạng thái object trong Heap -> Ảnh hưởng đến cả biến 'customer' ở hàm main.
    }
}
\`\`\`

## 2. String Pool - Vùng nhớ "VIP"

Java tối ưu hóa bộ nhớ cực kỳ thông minh với **String Pool**. Thay vì tạo ra hàng ngàn object String giống hệt nhau (ví dụ: "Hello"), Java chỉ lưu một bản duy nhất trong một vùng đặc biệt của Heap.

\`\`\`java
String s1 = "Hello"; // Kiểm tra Pool: chưa có "Hello" -> Tạo mới trong Pool.
String s2 = "Hello"; // Kiểm tra Pool: đã có "Hello" -> Trả về tham chiếu cũ. KHÔNG tạo object mới.
String s3 = new String("Hello"); // Dùng 'new' -> BẮT BUỘC tạo object mới trong Heap (ngoài Pool), dù nội dung giống hệt.

// So sánh địa chỉ bộ nhớ (Reference Equality)
System.out.println(s1 == s2); // true (Cùng trỏ vào 1 chỗ trong Pool)
System.out.println(s1 == s3); // false (s3 nằm riêng một chỗ khác)

// So sánh nội dung (Value Equality) - Luôn dùng cách này!
System.out.println(s1.equals(s3)); // true
\`\`\`

> **Bài học:** Luôn ưu tiên dùng String literal (\`"..."\`) thay vì \`new String(...)\` để tiết kiệm RAM.

## 3. Memory Leak trong Java? Thật sao?

Nhiều người nghĩ Java có Garbage Collector (GC) "thần thánh" nên không bao giờ bị leak memory như C++. **Sai lầm!** Memory Leak trong Java xảy ra khi bạn vô tình giữ tham chiếu đến các object không còn dùng nữa, khiến GC "không dám" xóa chúng.

**3 Thủ phạm giấu mặt:**
1.  **Static Collections:** Biến \`static\` sống dai như đỉa (suốt vòng đời ứng dụng). Nếu bạn cứ \`List.add()\` vào một \`static List\` mà quên \`remove\`, Heap sẽ phình to mãi mãi cho đến khi nổ tung (\`OOM\`).
2.  **Unclosed Resources:** Mở kết nối Database, File Stream, Network Socket mà quên \`close()\`. Dù object Java bị xóa, tài nguyên hệ điều hành bên dưới vẫn bị chiếm dụng.
3.  **Listener/Callback:** Đăng ký một sự kiện (\`button.addActionListener\`) nhưng khi object đó bị hủy, bạn quên \`removeActionListener\`. Nó vẫn bị tham chiếu bởi Event Source và không thể bị GC thu gom.

**Ví dụ Leak kinh điển:**

\`\`\`java
public class LeakExample {
    // Nguy hiểm: Static list này sẽ không bao giờ được GC dọn dẹp
    private static final List<Double> cache = new ArrayList<>();

    public void addToCache(Double data) {
        cache.add(data); 
        // Dữ liệu cứ nạp vào mãi... RAM tăng dần... Bùm!
    }
}
\`\`\`

**Giải pháp:** * Sử dụng \`WeakHashMap\` cho cache (tự động xóa key khi thiếu RAM).
* Luôn dùng \`try-with-resources\` để tự động đóng kết nối.
* Dùng các thư viện caching chuyên nghiệp như **Redis** hoặc **Caffeine** có cơ chế Eviction (tự động xóa dữ liệu cũ/ít dùng).
    `
  },
  { 
    id: 2, 
    title: "JavaScript ES6+: Clean Code Patterns", 
    category: "JavaScript", 
    date: "2025-10-05", 
    readTime: "12 min",
    content: `
# Viết code JavaScript "sạch" hơn với ES6+

Đừng viết JavaScript theo kiểu năm 2010 nữa. Hệ sinh thái JS đã thay đổi chóng mặt. Dưới đây là các pattern hiện đại giúp code của bạn không chỉ chạy được mà còn "đẹp", dễ đọc và an toàn hơn rất nhiều.

![JavaScript Modern Syntax](https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop)

## 1. Optional Chaining (?.) & Nullish Coalescing (??)

Xử lý object lồng nhau (Nested Object) và giá trị mặc định chưa bao giờ dễ thế. Ngày xưa, để tránh lỗi \`Cannot read property of undefined\`, chúng ta phải viết những dòng code kiểm tra dài lê thê.

**Trước đây (The old way):**
\`\`\`javascript
// Rất dài dòng và dễ lỗi nếu user là null
const street = user && user.address && user.address.street;

// Lỗi logic nguy hiểm: Nếu speed là 0 (số hợp lệ), nó vẫn lấy 100 (vì 0 là falsy trong JS)
const speed = (config.speed !== null && config.speed !== undefined) ? config.speed : 100;
\`\`\`

**Hiện đại (The modern way):**
\`\`\`javascript
// 1. Optional Chaining (?.):
// Nếu user null -> dừng lại trả về undefined.
// Nếu user.address null -> dừng lại trả về undefined.
// Code gọn hơn gấp 3 lần!
const street = user?.address?.street;

// 2. Nullish Coalescing (??):
// Chỉ lấy giá trị mặc định nếu vế trái là null hoặc undefined.
// Số 0, chuỗi rỗng "" hay false vẫn được coi là giá trị hợp lệ.
const speed = config.speed ?? 100; 
\`\`\`

## 2. Object Destructuring & Renaming

Khi làm việc với API, dữ liệu trả về thường là các object phức tạp. Destructuring giúp bạn "bóc tách" lấy đúng thứ mình cần ngay lập tức.

\`\`\`javascript
const response = {
    data: { 
        id: 1, 
        title: "Hello World",
        metadata: { views: 100, likes: 50 }
    },
    status: 200,
    timestamp: 163456789
};

// Kỹ thuật nâng cao:
// 1. Lấy data và đổi tên thành 'post' cho dễ hiểu.
// 2. Lấy status trực tiếp.
// 3. Gán giá trị mặc định cho error nếu không có.
// 4. Deep destructuring: Lấy luôn views từ bên trong metadata.
const { 
    data: post, 
    status, 
    error = null,
    data: { metadata: { views } } 
} = response;

console.log(post.title); // "Hello World"
console.log(views); // 100
\`\`\`

## 3. Spread Operator (...) cho Immutability

Trong React/Redux hay lập trình hàm (Functional Programming), việc không sửa đổi trực tiếp state (Mutation) là nguyên tắc vàng để tránh lỗi re-render không mong muốn.

\`\`\`javascript
const user = { name: "Quang", skills: ["Java", "SQL"] };

// SAI LẦM: Sửa trực tiếp (Mutate)
// user.skills.push("JS"); // Thay đổi object gốc -> React không biết state đã đổi để render lại.

// ĐÚNG ĐẮN: Tạo bản sao mới (Immutable)
const updatedUser = {
    ...user, // Copy toàn bộ thuộc tính cũ
    role: "Admin", // Ghi đè hoặc thêm thuộc tính mới
    skills: [...user.skills, "JS", "React"] // Copy mảng cũ và thêm phần tử mới vào mảng mới
};

console.log(user === updatedUser); // false (Hai object khác nhau -> React sẽ re-render đúng)
\`\`\`
    `
  },
  { 
    id: 3, 
    title: "Async/Await: Xử lý lỗi và Parallel", 
    category: "JavaScript", 
    date: "2025-10-10", 
    readTime: "12 min",
    content: `
# Làm chủ Bất đồng bộ: Từ cơ bản đến nâng cao

Mọi người đều biết dùng \`async/await\`, nhưng dùng sao cho hiệu quả, tối ưu hiệu năng và không chặn (block) ứng dụng thì không phải ai cũng rành. Dưới đây là các chiến thuật nâng cao.

![Async Programming](https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop)

## 1. Sai lầm phổ biến: Await tuần tự (Sequential)

Rất nhiều dev mới viết code như thế này. Nó đúng logic nhưng **chậm**.

\`\`\`javascript
async function loadProfile() {
    // Giả sử mỗi hàm mất 1 giây để chạy
    const user = await getUser();       // Chờ 1s... xong mới chạy dòng dưới
    const posts = await getPosts();     // Chờ thêm 1s...
    const friends = await getFriends(); // Chờ thêm 1s...
    
    // Tổng thời gian: 3 giây!
    return { user, posts, friends };
}
\`\`\`

Đây là hiệu ứng "Thác nước" (Waterfall). Dữ liệu \`posts\` và \`friends\` đâu có phụ thuộc vào \`user\` đâu? Tại sao phải chờ?

## 2. Tối ưu: Chạy song song với Promise.all

Hãy bắn cả 3 request cùng một lúc. Thời gian hoàn thành sẽ chỉ bằng request lâu nhất (1 giây).

\`\`\`javascript
async function loadProfileOptimized() {
    console.time("Load");
    
    // Bắt đầu cả 3 request cùng lúc, không chờ nhau
    // Promise.all sẽ trả về một mảng kết quả khi TẤT CẢ đều xong
    const [user, posts, friends] = await Promise.all([
        getUser(),
        getPosts(),
        getFriends()
    ]);

    console.timeEnd("Load"); // Chỉ mất ~1 giây! Nhanh gấp 3 lần.
    return { user, posts, friends };
}
\`\`\`

**Lưu ý quan trọng:** \`Promise.all\` có tính chất "All or Nothing". Nếu chỉ cần 1 request bị lỗi, toàn bộ \`Promise.all\` sẽ văng lỗi ngay lập tức. Nếu bạn muốn chạy bất chấp lỗi (cái nào lỗi thì bỏ qua, cái nào được thì lấy), hãy dùng **\`Promise.allSettled\`**.

## 3. Xử lý lỗi chuẩn (Robust Error Handling)

Đừng bao giờ viết \`await\` mà không có \`try-catch\`. Nếu API chết, ứng dụng của bạn cũng "bay màu" theo.

\`\`\`javascript
async function safeFetch() {
    try {
        const res = await fetch('/api/data');
        
        // Fetch không ném lỗi khi gặp 404 hay 500, nó chỉ ném lỗi khi mất mạng.
        // Nên ta phải tự check res.ok
        if (!res.ok) {
            throw new Error(\`HTTP Error: \${res.status}\`);
        }
        
        return await res.json();
    } catch (error) {
        // Xử lý lỗi tập trung
        console.error("Fetch failed:", error.message);
        
        // Return null hoặc giá trị mặc định để UI không bị crash
        return null; 
    }
}
\`\`\`
    `
  },
  { 
    id: 4, 
    title: "OOP Design: Xây dựng hệ thống Banking", 
    category: "Java", 
    date: "2025-10-12", 
    readTime: "15 min",
    content: `
# Áp dụng 4 tính chất OOP vào thực tế

Lý thuyết về Kế thừa, Đa hình, Đóng gói, Trừu tượng thì ai học xong đại học cũng thuộc làu làu. Nhưng áp dụng chúng để thiết kế một hệ thống linh hoạt (Flexible) và dễ bảo trì (Maintainable) thì lại là câu chuyện khác. 

Hãy cùng tôi thiết kế module thanh toán cho một ứng dụng Ngân hàng giả lập để thấy sức mạnh thực sự của OOP.

![OOP Design](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop)

## 1. Abstraction & Polymorphism (Trừu tượng & Đa hình)

**Vấn đề:** Nếu bạn viết code kiểu \`if (type == VISA) { ... } else if (type == MOMO) { ... }\`, mỗi lần thêm một phương thức thanh toán mới, bạn phải sửa lại code cũ. Điều này vi phạm nguyên tắc **Open-Closed Principle** (Mở để mở rộng, đóng để sửa đổi).

**Giải pháp:** Dùng Interface để trừu tượng hóa hành động "Thanh toán".

\`\`\`java
// Abstraction: Định nghĩa một "hợp đồng" chung.
// Bất kỳ ai muốn làm phương thức thanh toán đều phải tuân thủ hợp đồng này.
interface PaymentStrategy {
    void pay(double amount);
}

// Concrete Implementation 1: Thanh toán thẻ
class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Đang kết nối cổng Visa...");
        System.out.println("Thanh toán " + amount + " thành công qua thẻ.");
    }
}

// Concrete Implementation 2: Thanh toán ví điện tử
class EWalletPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Mở app Momo...");
        System.out.println("Thanh toán " + amount + " thành công qua Ví.");
    }
}
\`\`\`

## 2. Encapsulation (Đóng gói)

Dữ liệu quan trọng (như số dư tài khoản) không được phép phơi bày ra ngoài (\`public\`). Nếu ai cũng có thể sửa số dư, hệ thống sẽ loạn.

\`\`\`java
public class BankAccount {
    // Private: Chỉ nội bộ class này mới được đụng vào.
    private double balance; 

    // Public method: Cung cấp cách thức an toàn để tương tác với dữ liệu.
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            logTransaction("Nạp tiền", amount); // Tự động ghi log mỗi khi tiền thay đổi
        } else {
            throw new IllegalArgumentException("Số tiền nạp phải dương!");
        }
    }
    
    // Getter: Chỉ cho xem, không cho sửa trực tiếp.
    public double getBalance() {
        return balance;
    }
}
\`\`\`

## 3. Dependency Injection (Loose Coupling)

Kết hợp tất cả lại trong một Service xử lý checkout. Service này không cần biết nó đang thanh toán bằng gì, nó chỉ cần biết đối tượng kia có hàm \`pay()\` là đủ.

\`\`\`java
public class CheckoutService {
    private PaymentStrategy paymentMethod;

    // Constructor Injection: Tiêm sự phụ thuộc vào từ bên ngoài.
    // Giúp dễ dàng thay đổi phương thức thanh toán (Loose Coupling).
    public CheckoutService(PaymentStrategy method) {
        this.paymentMethod = method;
    }

    public void checkout(double total) {
        // Polymorphism tại đây: 
        // Java sẽ tự động gọi đúng hàm pay() của object thực tế (Visa hoặc Momo) lúc chạy (Runtime).
        paymentMethod.pay(total); 
    }
}

// Usage:
// Hôm nay thích dùng Momo
CheckoutService service = new CheckoutService(new EWalletPayment());
service.checkout(500.0); 

// Ngày mai thích dùng Visa -> Code của CheckoutService KHÔNG CẦN SỬA ĐỔI GÌ CẢ!
service = new CheckoutService(new CreditCardPayment());
service.checkout(1000.0);
\`\`\`
    `
  },
  { 
    id: 5, 
    title: "Spring Boot: Global Exception Handling", 
    category: "Java", 
    date: "2025-10-15", 
    readTime: "20 min",
    content: `
# Xử lý lỗi chuyên nghiệp trong Spring Boot: Đừng để User thấy Stack Trace

Trong một ứng dụng Backend chuẩn chỉnh, việc xử lý lỗi (Exception Handling) quan trọng không kém gì việc xử lý logic thành công. Đừng bao giờ để người dùng nhìn thấy thông báo lỗi mặc định của Tomcat hay Stack Trace dài ngoằng. Hãy trả về một JSON chuẩn hóa, thân thiện và dễ hiểu cho Frontend.

![Spring Boot Exception](https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop)

## 1. Tạo Custom Exception

Đầu tiên, hãy định nghĩa các lỗi nghiệp vụ cụ thể của dự án thay vì dùng \`RuntimeException\` chung chung.

\`\`\`java
// Lỗi khi không tìm thấy dữ liệu trong DB
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

// Lỗi khi dữ liệu đầu vào không hợp lệ
public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}
\`\`\`

## 2. Định nghĩa Error Response DTO

Chúng ta cần một cấu trúc JSON thống nhất cho toàn bộ hệ thống để Frontend dễ dàng parse và hiển thị.

\`\`\`java
@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;      // Mã HTTP (404, 400, 500)
    private String message;  // Thông báo lỗi dễ hiểu
    private long timestamp;  // Thời điểm xảy ra lỗi
    private String path;     // API nào bị lỗi
}
\`\`\`

## 3. @ControllerAdvice - Nơi bắt lỗi toàn cục

Đây là "vũ khí bí mật" của Spring. \`@RestControllerAdvice\` đóng vai trò như một cái lưới khổng lồ bao trùm toàn bộ ứng dụng. Bất kỳ Controller nào ném ra Exception, cái lưới này sẽ bắt lấy và xử lý tập trung.

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Bắt lỗi ResourceNotFound (404)
    // Ví dụ: Tìm user ID 999 không thấy -> Ném ra lỗi này
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex, WebRequest request) {
        return new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(), 
            System.currentTimeMillis(),
            request.getDescription(false)
        );
    }

    // Bắt lỗi Validation (400) - Ví dụ: email sai định dạng, thiếu tên...
    // Spring Validation (@Valid) sẽ ném ra MethodArgumentNotValidException
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors; // Trả về map các field bị lỗi chi tiết
    }
    
    // Bắt tất cả lỗi còn lại (500) - Fallback cho những lỗi không lường trước
    // Ví dụ: NullPointer, Database Connection Timeout...
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGlobalError(Exception ex, WebRequest request) {
        // Nên log lỗi ra file/console ở đây để dev biết mà sửa
        ex.printStackTrace(); 
        
        return new ErrorResponse(
            500, 
            "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.", // Thông báo chung chung an toàn
            System.currentTimeMillis(),
            request.getDescription(false)
        );
    }
}
\`\`\`
    `
  },
  { 
    id: 6, 
    title: "Event Loop: Microtasks vs Macrotasks", 
    category: "JavaScript", 
    date: "2025-10-18", 
    readTime: "15 min",
    content: `
# Thử thách IQ JavaScript: Bạn có thực sự hiểu Event Loop?

JavaScript là ngôn ngữ đơn luồng (single-threaded), nhưng nó lại xử lý bất đồng bộ "như thần". Bí mật nằm ở **Event Loop**. Nếu bạn muốn trở thành Senior JS Dev, bạn bắt buộc phải phân biệt được **Microtask Queue** và **Macrotask Queue**.

![JS Event Loop Mechanics](https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1000&auto=format&fit=crop)

## Code Challenge

Hãy nhìn đoạn code dưới đây và đoán xem nó in ra console theo thứ tự nào? (Đừng chạy thử vội, hãy suy nghĩ trước!)

\`\`\`javascript
console.log('1. Start');

setTimeout(() => {
    console.log('2. Timeout');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise');
});

console.log('4. End');
\`\`\`

---

## Giải thích chi tiết từng bước

**Kết quả chính xác:** \`1. Start\` -> \`4. End\` -> \`3. Promise\` -> \`2. Timeout\`

Tại sao \`Timeout\` để 0ms mà lại chạy sau cùng? Tại sao \`Promise\` lại chen ngang?

1.  **Bước 1 (Call Stack):** JS chạy dòng 1, in **"1. Start"**.
2.  **Bước 2 (Web APIs):** Gặp \`setTimeout\`. Trình duyệt nhận lệnh "Hẹn giờ 0ms". Sau 0ms, nó đẩy callback \`console.log('2. Timeout')\` vào **Macrotask Queue** (Hàng đợi vĩ mô).
3.  **Bước 3 (Web APIs):** Gặp \`Promise\`. Promise được giải quyết ngay lập tức. Callback \`console.log('3. Promise')\` được đẩy vào **Microtask Queue** (Hàng đợi vi mô).
4.  **Bước 4 (Call Stack):** JS chạy dòng cuối, in **"4. End"**.
5.  **Bước 5 (Event Loop - Phút quyết định):** Call Stack giờ đã rỗng. Event Loop bắt đầu làm việc. Quy tắc vàng là:
    * **Ưu tiên Microtask:** Nó sẽ check Microtask Queue trước. Có task nào không? Có! -> Lấy ra chạy -> In **"3. Promise"**.
    * Chỉ khi Microtask Queue *hoàn toàn trống rỗng*, nó mới ngó sang Macrotask Queue.
    * Lấy task từ Macrotask Queue -> In **"2. Timeout"**.

## Kết luận quan trọng
* **Microtasks (Promise, queueMicrotask, MutationObserver):** Có độ ưu tiên cao hơn. Chúng sẽ được thực thi *ngay lập tức* sau khi code đồng bộ chạy xong và *trước khi* trình duyệt vẽ lại màn hình (render).
* **Macrotasks (setTimeout, setInterval, I/O):** Độ ưu tiên thấp hơn.

> **Ứng dụng:** Nếu bạn muốn thực hiện một việc gì đó *ngay lập tức* mà không muốn chờ lần render sau, hãy dùng Microtask. Nếu muốn nhường tài nguyên cho UI render trước rồi mới làm, hãy dùng setTimeout.
    `
  },
  { 
    id: 7, 
    title: "Design Patterns: Builder & Singleton", 
    category: "Java", 
    date: "2025-10-20", 
    readTime: "12 min",
    content: `
# Design Patterns thực chiến: Builder & Thread-Safe Singleton

Trong các dự án thực tế, bạn sẽ không chỉ dùng \`if-else\` hay \`for-loop\`. Bạn cần những cấu trúc code bền vững. Dưới đây là 2 mẫu thiết kế (Design Pattern) bạn sẽ gặp hàng ngày, đặc biệt khi làm với Spring Boot hay các thư viện lớn.

![Design Patterns Java](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop)

## 1. Thread-Safe Singleton (Double-Checked Locking)

Singleton đảm bảo một class chỉ có DUY NHẤT một instance. Nhưng viết Singleton sao cho an toàn trong môi trường đa luồng (Multi-threaded) thì không phải ai cũng biết.

\`\`\`java
public class DatabaseConnection {
    // volatile: Từ khóa quan trọng! Đảm bảo mọi luồng đều nhìn thấy giá trị mới nhất của biến này ngay khi nó thay đổi (Visibility).
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        // Private constructor để ngăn chặn new instance từ bên ngoài
        System.out.println("Kết nối DB được khởi tạo!");
    }

    public static DatabaseConnection getInstance() {
        // Check lần 1: Nếu đã có instance rồi thì trả về luôn, không cần lock (Tối ưu hiệu năng).
        if (instance == null) {
            // Bắt đầu đoạn code đồng bộ hóa (chỉ 1 luồng được vào tại 1 thời điểm).
            synchronized (DatabaseConnection.class) {
                // Check lần 2: Cần thiết vì có thể 2 luồng cùng vượt qua check lần 1 và đợi ở cửa synchronized.
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
\`\`\`

## 2. Builder Pattern: Cứu tinh cho Constructor

Khi một Object có quá nhiều tham số (đặc biệt là tham số tùy chọn), Constructor truyền thống sẽ trở thành thảm họa "Telescoping Constructor".

**Vấn đề:**
\`\`\`java
// Khó đọc, dễ nhầm thứ tự. Cái nào là tuổi? Cái nào là role? True là gì?
User user = new User("Quang", "Le", 25, "Hanoi", "Dev", true, false, "VN"); 
\`\`\`

**Giải pháp Builder:** Giúp code đọc như văn xuôi.

\`\`\`java
public class User {
    private String firstName; // Bắt buộc
    private String lastName;  // Bắt buộc
    private int age;          // Tùy chọn
    private String address;   // Tùy chọn
    // ...

    // Private constructor để bắt buộc dùng Builder
    private User(UserBuilder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.address = builder.address;
    }

    public static class UserBuilder {
        private String firstName;
        private String lastName;
        private int age;
        private String address;

        public UserBuilder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public UserBuilder age(int age) {
            this.age = age;
            return this; // Trả về this để chain method (gọi liên tiếp)
        }

        public UserBuilder address(String address) {
            this.address = address;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}

// Sử dụng: Rất rõ ràng, dễ đọc, linh hoạt thứ tự
User u = new User.UserBuilder("Quang", "Le")
            .age(25)
            .address("Hồ Chí Minh") // Có thể bỏ qua nếu không muốn set
            .build();
\`\`\`
    `
  },
  { 
    id: 8, 
    title: "React Performance: useMemo & useCallback", 
    category: "JavaScript", 
    date: "2025-10-22", 
    readTime: "10 min",
    content: `
# Tối ưu React: Đừng để Re-render "giết chết" App của bạn

React rất nhanh nhờ Virtual DOM, nhưng nếu bạn không kiểm soát được việc re-render, app sẽ trở nên ì ạch, đặc biệt trên các thiết bị mobile yếu. Hai vũ khí tối thượng để xử lý vấn đề này là \`useMemo\` và \`useCallback\`, nhưng hãy cẩn thận, dùng sai còn chậm hơn không dùng!

![React Hooks](https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop)

## Vấn đề: Referential Equality (Tham chiếu không bằng nhau)

Trong JS, \`{}\` không bằng \`{}\`. Mỗi khi component cha render, mọi function bên trong nó đều được tạo mới (địa chỉ bộ nhớ mới). Nếu truyền function này xuống component con, con sẽ nghĩ "Props thay đổi rồi!" và render lại, dù logic hàm đó y hệt cũ.

\`\`\`javascript
function Parent() {
    const [count, setCount] = useState(0);

    // Hàm này được tạo mới MỖI LẦN Parent render (địa chỉ bộ nhớ mới)
    // Dẫn đến Child bị re-render oan uổng, dù Child đã dùng React.memo
    const handleClick = () => {
        console.log("Clicked");
    };

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
            <Child onClick={handleClick} />
        </div>
    );
}
\`\`\`

## Giải pháp 1: useCallback (Ghi nhớ hàm)

\`useCallback\` giúp giữ nguyên tham chiếu của hàm qua các lần render, trừ khi dependency thay đổi.

\`\`\`javascript
// Chỉ tạo lại hàm khi dependency thay đổi (ở đây là rỗng [] -> tạo 1 lần dùng mãi mãi)
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []);

// Kết hợp với React.memo ở component con
// React.memo: Chỉ render lại nếu props thực sự thay đổi (shallow compare)
const Child = React.memo(({ onClick }) => {
    console.log("Child Rendered"); // Giờ sẽ không bị log ra mỗi khi bấm nút Count nữa!
    return <button onClick={onClick}>Click Me</button>;
});
\`\`\`

## Giải pháp 2: useMemo (Ghi nhớ giá trị)

Dùng cho các tính toán nặng (Heavy Computation) để tránh tính toán lại mỗi lần render.

\`\`\`javascript
const expensiveValue = useMemo(() => {
    // Giả sử hàm này chạy mất 500ms (lọc mảng triệu phần tử chẳng hạn)
    return heavyCalculation(data); 
}, [data]); // Chỉ tính lại khi 'data' đổi. Nếu component re-render vì state khác, nó dùng lại kết quả đã cache.
\`\`\`

> **Lời khuyên:** Đừng lạm dụng! Bản thân việc so sánh dependency array cũng tốn chi phí. Chỉ dùng khi bạn thực sự thấy vấn đề về hiệu năng hoặc cần đảm bảo tham chiếu ổn định (referential stability).
    `
  },
  { 
    id: 9, 
    title: "Java Concurrency: CompletableFuture", 
    category: "Java", 
    date: "2025-10-25", 
    readTime: "18 min",
    content: `
# Java Concurrency hiện đại: Bỏ qua Thread thủ công

Ngày xưa, muốn xử lý đa luồng, chúng ta phải vật lộn với \`Thread\`, \`Runnable\`, rồi tự \`join()\`, \`wait()\`, \`notify()\`. Code rất rối và dễ deadlock. Từ Java 8, **CompletableFuture** ra đời như một cuộc cách mạng, mang phong cách lập trình bất đồng bộ (Asynchronous) hiện đại vào Java, tương tự như Promise trong JavaScript.

![Java CompletableFuture](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop)

## 1. Chạy tác vụ bất đồng bộ (Non-blocking)

Giả sử bạn muốn gửi email, việc này tốn thời gian và không nên chặn luồng chính (Main Thread).

\`\`\`java
public void asyncProcess() {
    System.out.println("Bắt đầu...");

    // supplyAsync: Chạy task trong ForkJoinPool (Thread khác)
    // Main thread sẽ không bị dừng ở đây.
    CompletableFuture.supplyAsync(() -> {
        // Giả lập tác vụ nặng (DB call, API call, Send mail)
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        return "Hello";
    }).thenApply(result -> {
        // Callback 1: Xử lý kết quả khi task trên xong
        // Chạy ngay sau khi task trên return
        return result + " World";
    }).thenAccept(finalResult -> {
        // Callback 2: In ra kết quả cuối cùng (Consumer)
        System.out.println("Kết quả: " + finalResult); // In ra "Hello World" sau 1s
    });
    
    System.out.println("Main thread vẫn chạy tiếp, không cần chờ!");
}
\`\`\`

## 2. Kết hợp nhiều luồng (Combine / Parallel Execution)

Bài toán thực tế: Bạn cần lấy thông tin **User** từ DB và thông tin **Order** từ một Microservice khác. Hai việc này không liên quan nhau, nên chạy song song cho nhanh. Sau đó gộp kết quả lại để gửi báo cáo.

\`\`\`java
public void parallelTasks() {
    // Task 1: Lấy User (Chạy luồng riêng A)
    CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> getUser(userId));

    // Task 2: Lấy Order (Chạy luồng riêng B - Song song với A)
    CompletableFuture<Order> orderFuture = CompletableFuture.supplyAsync(() -> getOrder(orderId));

    // thenCombine: Chờ cả A và B xong, rồi gộp kết quả
    userFuture.thenCombine(orderFuture, (user, order) -> {
        // Hàm này chỉ chạy khi CẢ HAI task trên đều hoàn thành
        return "Gửi mail cho " + user.getName() + " về đơn hàng " + order.getId();
    }).thenAccept(System.out::println); // In ra kết quả gộp
}
\`\`\`

**Tại sao nó xịn?**
1.  **Code sạch:** Không còn \`new Thread()\`.
2.  **Non-blocking:** Tận dụng tối đa CPU.
3.  **Functional Style:** Dễ dàng chain các hành động (\`thenApply\`, \`thenCompose\`, \`exceptionally\`).
    `
  },
];