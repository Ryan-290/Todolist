import Header from "@/component/header.js"


export default function header({children}) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
