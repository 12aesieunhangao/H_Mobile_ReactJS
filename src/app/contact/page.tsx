

export default function Home() {
  return (
    <div>
  
    {/* <!-- Main Content --> */}
    <main className="container mx-auto mt-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#3399FF] mb-6">
            Gửi Tin Nhắn Cho Chúng Tôi
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                placeholder="Nhập họ và tên"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Nhập số điện thoại"
                className="w-full border border-[#3399FF] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Tin nhắn
              </label>
              <textarea
                id="message"
                placeholder="Nhập nội dung tin nhắn"
                className="w-full border border-[#3399FF] rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#3399FF]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#3399FF] text-white rounded-full px-4 py-2 hover:bg-[#267acc] transition-colors"
            >
              Gửi Liên Hệ
            </button>
          </form>
        </div>
  
        {/* Contact Information */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#3399FF] mb-6">
            Thông Tin Liên Hệ
          </h2>
          <div className="space-y-4">
            <p className="flex items-center text-gray-700">
              <i className="bi bi-geo-alt-fill text-[#3399FF] mr-2"></i>
              Phường Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh
            </p>
            <p className="flex items-center text-gray-700">
              <i className="bi bi-telephone-fill text-[#3399FF] mr-2"></i>
              Hotline: 0987654321
            </p>
            <p className="flex items-center text-gray-700">
              <i className="bi bi-envelope-fill text-[#3399FF] mr-2"></i>
              Email: info@hpltour.com
            </p>
            <p className="flex items-center text-gray-700">
              <i className="bi bi-chat-fill text-[#3399FF] mr-2"></i>
              Zalo: 0987654321
            </p>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-medium mb-2">Theo dõi chúng tôi:</p>
            <p className="text-2xl space-x-4">
              <a href="#" className="text-[#3399FF] hover:text-[#267acc]">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-[#3399FF] hover:text-[#267acc]">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-[#3399FF] hover:text-[#267acc]">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-[#3399FF] hover:text-[#267acc]">
                <i className="bi bi-tiktok"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  

  </div>
  );
}
