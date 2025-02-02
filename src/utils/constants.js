// Port khi chạy Local trên máy tính
// export const API_ROOT = 'http://localhost:8017'

/**
 * - Port khi mình đẩy code server lên cloud (dùng Render.com) -> đang gặp lỗi thêm thẻ tín dụng thì mới được dùng Render.com -> đang tìm phương án thay thế
 * - Nếu deploy server lên cloud được rồi thì trên web đó nó sẽ generate cho mình 1 cái link, sau đó mình sẽ lấy cái link đó thay thế vào API_ROOT là xong
 */

// export const API_ROOT = ''

/**
 * ✅✅✅ Trong phần này chúng ta sẽ viết lại file kết nối với Back-end khi project chạy ở dưới local dev và chạy ở Back-end khi deploy lên cloud ✅✅✅
 */
let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8000'
}
if (process.env.BUILD_MODE === 'production') {
  // Trong này sẽ là đường dẫn đến back-end khi project phía back-end đã deploy lên cloud
  // apiRoot = ''
}

export const API_ROOT = apiRoot
