import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { AiOutlinePicture } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

export interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
  likes: number;
}

interface ImgDataTypes {
  total: number;
  total_pages: number;
  results: Image[];
}

export type ModalTypes = {
  isOpen: boolean;
  url: string;
  alt: string;
  descr: string;
  author: string;
  likes: number;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [imgData, setImgData] = useState<Image[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMoreButtonState, setLoadMoreButtonState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState<ModalTypes>({
    isOpen: false,
    url: "",
    alt: "",
    descr: "",
    author: "",
    likes: 0,
  });
  const galleryRef = useRef<HTMLImageElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const PERPAGE: string = "15";

  const searchParams = new URLSearchParams({
    query: search,
    per_page: PERPAGE,
    page: currentPage.toString(),
  });

  useEffect(() => {
    if (search === "") {
      return;
    }
    try {
      const dataRequest = async (): Promise<ImgDataTypes> => {
        setLoading(true);
        setErrorMsg("");
        const response = await axios.get<ImgDataTypes>(
          `https://api.unsplash.com/search/photos?${searchParams}`,
          {
            headers: {
              Authorization: `Client-ID bF_HerDN5h7a7WozJpD-AEWD08N_mhzLLSreF6YpFxA`,
            },
          }
        );
        return response.data;
      };

      dataRequest()
        .then((data: ImgDataTypes): void => {
          setImgData((prev) => [...prev, ...data.results]);
          setTotal(data.total);
          if (data.total === 0)
            setErrorMsg("Nothing was found for your request");

          checkPages(data.total_pages);
          setLoading(false);
        })
        .catch((error): void => {
          setLoading(false);
          setErrorMsg(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, [search, currentPage]);

  useEffect(() => {
    if (currentPage > 1) scrollWindow();
  }, [imgData, currentPage]);

  const handleSearch = (searchRequest: string): string | void => {
    if (searchRequest === search) {
      return toast.error("This request already done, try another one");
    }
    setCurrentPage(1);
    setLoadMoreButtonState(false);
    setSearch(searchRequest);
    setImgData([]);
    setTotal(0);
  };

  const handleLoadMore = (): void => {
    setCurrentPage(currentPage + 1);
  };

  const checkPages = (dataPages: number): void => {
    if (dataPages > 1) {
      setLoadMoreButtonState(true);
    }

    if (currentPage >= dataPages) {
      setLoadMoreButtonState(false);
    }
  };

  const handleOpenModal = ({
    isOpen,
    url,
    alt,
    descr,
    author,
    likes,
  }: ModalTypes): void => {
    setIsOpen({
      isOpen,
      url,
      alt,
      descr,
      author,
      likes,
    });
  };

  const handleCloseModal = (): void => {
    setIsOpen({ ...modalIsOpen, isOpen: false });
  };

  const scrollWindow = (): void => {
    if (galleryRef.current)
      window.scrollBy({
        top: galleryRef.current.height * 3,
        behavior: "smooth",
      });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <div style={{ width: "100%", height: "120px" }}></div>
      <Toaster position="top-left" reverseOrder={true} />
      {!(total > 0) && <AiOutlinePicture className="bgIcon" />}
      {total > 0 && (
        <ImageGallery
          lastImageRef={galleryRef}
          data={imgData}
          onModal={handleOpenModal}
        />
      )}
      {!loading && <ErrorMessage text={errorMsg} />}
      <ImageModal data={modalIsOpen} closeModal={handleCloseModal} />
      <Loader loading={loading} />
      {loadMoreButtonState && <LoadMoreButton onNext={handleLoadMore} />}
    </>
  );
}

export default App;
