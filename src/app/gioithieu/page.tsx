export default function Home() {
  return (
    <div>
      <main className="container mx-auto mt-6 px-4">
        <div className="py-12">
          {/* About Section */}
          <section className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[#3399FF] mb-4">Giới Thiệu Về HPL Mobile</h1>
            <p className="text-gray-700 max-w-3xl mx-auto text-justify line-clamp-4">
              HPL Mobile tự hào là một trong những cửa hàng bán lẻ điện thoại hàng đầu tại Việt Nam, nơi mang đến cho khách hàng những sản phẩm công nghệ hiện đại và đáng tin cậy nhất. Chúng tôi chuyên cung cấp các dòng điện thoại chính hãng từ những thương hiệu nổi tiếng toàn cầu như Apple, Samsung, Xiaomi, Oppo, cùng với đa dạng phụ kiện công nghệ chất lượng cao. Với hơn 10 năm kinh nghiệm trong ngành, HPL Mobile không chỉ chú trọng đến việc cung cấp sản phẩm mà còn cam kết mang lại trải nghiệm mua sắm tuyệt vời, dịch vụ hậu mãi tận tâm và giá cả cạnh tranh nhất trên thị trường. Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ khách hàng trong việc lựa chọn thiết bị phù hợp với nhu cầu cá nhân, từ những người yêu công nghệ cho đến những khách hàng cần thiết bị cơ bản phục vụ công việc và cuộc sống hàng ngày.
            </p>
          </section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#3399FF] mb-4">Sứ Mệnh</h2>
              <p className="text-gray-700 text-justify line-clamp-4">
                Tại HPL Mobile, sứ mệnh của chúng tôi là mang đến cho khách hàng những sản phẩm điện thoại tiên tiến, chất lượng vượt trội và dịch vụ chăm sóc khách hàng chu đáo nhất. Chúng tôi mong muốn không chỉ cung cấp thiết bị công nghệ mà còn tạo ra giá trị thực sự trong cuộc sống của bạn, từ việc hỗ trợ kết nối với gia đình, bạn bè, đến việc giúp bạn làm việc hiệu quả hơn nhờ các sản phẩm đáng tin cậy. HPL Mobile luôn đặt sự hài lòng của khách hàng lên hàng đầu, đảm bảo mỗi sản phẩm đến tay bạn đều đi kèm với cam kết về chất lượng, chính hãng và chính sách bảo hành rõ ràng. Chúng tôi tin rằng công nghệ không chỉ là công cụ, mà còn là cầu nối mang lại niềm vui và sự tiện nghi cho cuộc sống hiện đại.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#3399FF] mb-4">Tầm Nhìn</h2>
              <p className="text-gray-700 text-justify line-clamp-4">
                HPL Mobile hướng tới mục tiêu trở thành thương hiệu bán lẻ điện thoại được yêu thích và tin cậy nhất tại Việt Nam trong vòng 5 năm tới. Chúng tôi không ngừng nỗ lực để tiên phong trong việc cập nhật các dòng sản phẩm mới nhất từ các thương hiệu hàng đầu thế giới, đồng thời nâng cao chất lượng dịch vụ để đáp ứng mọi kỳ vọng của khách hàng. Tầm nhìn của chúng tôi là xây dựng một hệ thống cửa hàng hiện đại, nơi khách hàng không chỉ mua sắm mà còn được trải nghiệm công nghệ một cách trọn vẹn. HPL Mobile mong muốn đóng góp vào sự phát triển của ngành công nghệ tại Việt Nam, mang đến những giải pháp tối ưu và thúc đẩy xu hướng sử dụng thiết bị thông minh trong cộng đồng.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-[#3399FF] mb-6">Đội Ngũ Của Chúng Tôi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-md rounded-lg p-6">
                <img
                  src="https://cdn.24h.com.vn/upload/1-2025/images/2025-03-20/1742451538-ngoai-hinh-dien-trai-cua-duong-kim-nam-vuong-campuchia-hinh-3-width571height800.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-700">Nguyễn Văn A</h3>
                <p className="text-gray-600">Quản lý Cửa hàng</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <img
                  src="https://static.tuoitre.vn/tto/i/s626/2016/12/08/cam-photo-torture-folo-1481179041.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-700">Trần Thị B</h3>
                <p className="text-gray-600">Nhân viên Bán hàng</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <img
                  src="https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/3/20/4814827136331318594670821627598923233838982n-17424584913781155226435.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-700">Lê Văn C</h3>
                <p className="text-gray-600">Kỹ thuật viên</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}