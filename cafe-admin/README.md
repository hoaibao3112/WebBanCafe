# Cafe Admin - Trang Quản Trị

Đây là dự án trang quản trị cho cửa hàng trà sữa Boba Tea, được xây dựng bằng React.

## Tính năng

- 📊 **Dashboard**: Tổng quan hoạt động kinh doanh
- 📦 **Quản lý đơn hàng**: Xem, cập nhật trạng thái đơn hàng
- 🧋 **Quản lý sản phẩm**: Thêm, sửa, xóa sản phẩm
- 🎁 **Quản lý khuyến mãi**: Tạo và quản lý mã giảm giá
- 👥 **Quản lý khách hàng**: Xem thông tin và lịch sử khách hàng

## Công nghệ sử dụng

- React 18
- React Router 6
- Redux Toolkit
- Ant Design 5
- Axios
- Day.js

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm start

# Build production
npm run build
```

## Cấu hình

Tạo file `.env` trong thư mục gốc:

```env
REACT_APP_API_URL=http://localhost:5000/api
PORT=3002
```

## Đăng nhập Demo

- Email: `admin@boba.com`
- Password: `123456`

## Cấu trúc thư mục

```
cafe-admin/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── AdminLayout.js
│   │       └── AdminLayout.css
│   ├── pages/
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── OrderManagement/
│   │   ├── ProductManagement/
│   │   ├── PromotionManagement/
│   │   └── CustomerManagement/
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── orderService.js
│   │   ├── productService.js
│   │   └── promotionService.js
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       └── authSlice.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Cổng

- Admin Panel: http://localhost:3002
- Backend API: http://localhost:5000
- Customer Frontend: http://localhost:3001

## Scripts

- `npm start` - Chạy development server
- `npm run build` - Build production
- `npm test` - Chạy tests
- `npm run eject` - Eject từ Create React App
