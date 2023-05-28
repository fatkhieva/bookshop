import { getGoogleApiBooks } from "../http/axios-client";
import { addBook } from "../cart/cart";

export function interpolate(str, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  const htmlString = new Function(...names, `return \`${str}\`;`)(...vals);
  const htmlNode = new DOMParser().parseFromString(htmlString, "text/html");
  const cardNode = htmlNode.body.firstChild

  setButtonListener(cardNode, params.id);

  return cardNode;
}

export function initBooks(selectedSubject) {
  const itemContainer = document.querySelector("#item-container");
  const cardItem = document.querySelector("#card-item");
  const loadMoreBtn = document.querySelector("#load-more-btn");

  let currentPage = 0;

  const getBooks = async () => {
    const response = await getGoogleApiBooks(selectedSubject, currentPage);

    if (
      response.data &&
      response.data.items &&
      Array.isArray(response.data.items)
    ) {
      const items = response.data.items;
      const books = items.map((book) => extractEntity(book));

      // console.log(books); // TODO: to be removed

      const booksHtml = books.map((book) =>
        interpolate(cardItem.innerHTML, book)
      );

      booksHtml.forEach((html) =>
        itemContainer.append(html)
      );

      loadMoreBtn.style.removeProperty("display");
    }
  };

  const loadBooks = () => {
    currentPage = 0;
    itemContainer.innerHTML = "";
    loadMoreBtn.style.display = "none";
    getBooks();
  };

  const loadMore = () => {
    currentPage++;
    getBooks();
  };

  loadMoreBtn.onclick = loadMore;

  loadBooks();
}

export function setButtonListener(node, id) {
  const button = node.querySelector('button.button');
  button.onclick = () => addBook(id);
}

export function extractEntity(book) {
  const trimTitle = (title) => {
    return title.length > 90 ? title.substring(0, 90) + "..." : title;
  };

  const id = book.id;

  const title =
    book.volumeInfo && book.volumeInfo.title
      ? book.volumeInfo.title
      : "NO TITLE";

  const authors =
    book.volumeInfo &&
    book.volumeInfo.authors &&
    Array.isArray(book.volumeInfo.authors)
      ? book.volumeInfo.authors.join(", ")
      : "NO AUTHORS";
  const subtitle =
    book.volumeInfo && book.volumeInfo.subtitle
      ? trimTitle(book.volumeInfo.subtitle)
      : "NO DESCRIPTION";
  const image =
    book.volumeInfo &&
    book.volumeInfo.imageLinks &&
    book.volumeInfo.imageLinks.thumbnail
      ? book.volumeInfo.imageLinks.thumbnail
      : "img/cover.png";
  return { id, title, authors, subtitle, image };
}

const mock = {
  kind: "books#volume",
  id: "l_bLDQAAQBAJ",
  etag: "TUgdFUDGGG8",
  selfLink: "https://www.googleapis.com/books/v1/volumes/l_bLDQAAQBAJ",
  volumeInfo: {
    title: "Tao of Charlie Munger",
    subtitle:
      "A Compilation of Quotes from Berkshire Hathaway’s Vice Chairman on Life, Business, and the Pursuit of Wealth With Commentary by David Clark",
    authors: ["Charles T. Munger"],
    publisher: "Simon and Schuster",
    publishedDate: "2017-01-03",
    description:
      '"A compendium of pithy quotes culled from interviews, speeches, the Daily journal, and questions and answers at the Berkshire Hathaway and Wesco annual meetings, offering insights into Munger\'s remarkable financial success and life philosophies"--Front jacket flap.',
    industryIdentifiers: [
      {
        type: "ISBN_13",
        identifier: "9781501153341",
      },
      {
        type: "ISBN_10",
        identifier: "150115334X",
      },
    ],
    readingModes: {
      text: false,
      image: false,
    },
    pageCount: 256,
    printType: "BOOK",
    categories: ["Business & Economics"],
    maturityRating: "NOT_MATURE",
    allowAnonLogging: false,
    contentVersion: "0.1.0.0.preview.0",
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=l_bLDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=l_bLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    language: "en",
    previewLink:
      "http://books.google.com/books?id=l_bLDQAAQBAJ&printsec=frontcover&dq=subject:Business&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
    infoLink:
      "http://books.google.com/books?id=l_bLDQAAQBAJ&dq=subject:Business&hl=&as_pt=BOOKS&source=gbs_api",
    canonicalVolumeLink:
      "https://books.google.com/books/about/Tao_of_Charlie_Munger.html?hl=&id=l_bLDQAAQBAJ",
  },
  saleInfo: {
    country: "ME",
    saleability: "NOT_FOR_SALE",
    isEbook: false,
  },
  accessInfo: {
    country: "ME",
    viewability: "PARTIAL",
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
    epub: {
      isAvailable: false,
    },
    pdf: {
      isAvailable: false,
    },
    webReaderLink:
      "http://play.google.com/books/reader?id=l_bLDQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
    accessViewStatus: "SAMPLE",
    quoteSharingAllowed: false,
  },
};
