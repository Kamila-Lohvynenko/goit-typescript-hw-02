import { useEffect, useState } from 'react';
import './App.css';
import { fetchImages } from '../../api/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import CustomModal from '../ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';
import { IImage } from '../../api/api.types';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<IImage[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        setImages(prevImages => {
          // console.log([...prevImages, ...data.results]);

          return [...prevImages, ...data.results];
        });
        setShowLoadMore((data.total_pages && data.total_pages) !== page);
        setNotFound(data.total_pages === 0);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, query]);

  const handleSearch = (query: string): void => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const handleOpenModal = (image: IImage): void => {
    setSelectedImage(image);
    setIsOpen(true);
  };
  const handleCloseModal = (): void => {
    setIsOpen(false);
    setSelectedImage(null);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={handleOpenModal} />
      )}
      {images.length > 0 && showLoadMore && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      <CustomModal
        isOpen={modalIsOpen}
        closeModal={handleCloseModal}
        selectedImage={selectedImage}
      />
      {notFound && <p>Nothing is found with your request {query}</p>}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
