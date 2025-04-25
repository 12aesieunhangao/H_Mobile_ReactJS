export default function Footer() {
    return (
        <footer className="bg-[#3399FF] text-white mt-12 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div>
            <p className="font-bold mb-4">LIÊN HỆ</p>
            <p>Phường Tân Chánh Hiệp, Quận 12</p>
            <p>Điện thoại: 0987654321</p>
            <p>Email: infohpltour.com</p>
            <p>Zalo: 0987654321</p>
          </div>
          <div>
            <p className="font-bold mb-4">TOUR DU LỊCH</p>
            <p>Du lịch miền Nam</p>
            <p>Du lịch miền Bắc</p>
            <p>Du lịch miền Trung</p>
            <p>Du lịch Quốc Tế</p>
          </div>
          <div>
            <p className="font-bold mb-4">HỖ TRỢ NHANH</p>
            <p>Tư vấn tour: 0987654321</p>
            <p>Tư vấn đổi vé: 0123456789</p>
            <p>Tư vấn bảo hiểm: 09274615389</p>
            <p>Tư vấn vận chuyển: 017380183910</p>
          </div>
          <div>
            <p className="font-bold mb-4">THEO DÕI HPLTOUR</p>
            <p className="text-2xl space-x-4">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-tiktok"></i>
            </p>
            <img
              src="https://elise.vn/media/wysiwyg/bocongthuong.png"
              className="w-48 mt-4"
              alt=""
            />
          </div>
        </div>
      </footer>
    );
  }
  