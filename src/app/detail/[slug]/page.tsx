function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
        .replace(/[^a-z0-9 ]/g, '') // Xóa ký tự đặc biệt
        .trim()
        .replace(/\s+/g, '-'); // Thay khoảng trắng bằng dấu -
}

export default function Home({ params }: { params: { slug: string } }) {
    let decodedSlug = params.slug;

    try {
        decodedSlug = decodeURIComponent(params.slug);
    } catch (error) {
        console.error("Lỗi decode slug:", error);
        decodedSlug = "invalid-slug"; // Xử lý lỗi bằng cách gán giá trị mặc định
    }

    return (
        <div>
            <h1>My slug: {decodedSlug}</h1>
            <h2>Slug generated: {generateSlug(decodedSlug)}</h2>
        </div>
    );
}

// Ví dụ sử dụng
console.log(generateSlug("Học Lập Trình Web Nhanh 100%!!!"));  
// Kết quả: hoc-lap-trinh-web-nhanh-100
