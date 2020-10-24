import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <footer>
              <p>
                All data on this page is courtesy of <i>Deutsche Bahn AG</i>.
                It has been retrieved using their <a href="https://data.deutschebahn.com/">Open-Data-Portal</a>.
                All data is licensed under the terms of <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.
                This site is neither endorsed by nor affiliated with <a href="https://www.bahn.de">Deutsche Bahn AG</a>. 
              </p>
              <p>
                <script src="https://inform.everyone.wtf/legal.min.js?float" data-site-id="a2d9952c-ea85-4859-9ea0-24c26f413983"></script>
              </p>
          </footer>
        </body>
      </Html>
    )
  }
}

export default MyDocument
