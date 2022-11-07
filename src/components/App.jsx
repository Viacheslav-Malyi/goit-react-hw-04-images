import { useEffect } from 'react';
import { fetchImage } from '../components/API/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Toast, Notification } from './Notification/Notofication';
import { useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const getFeth = async () => {
      setStatus('pending');
      setLoadMore(true);
      try {
        const result = await fetchImage(searchQuery, page);
        if (!result.length) {
          throw new Error();
        }
        if (result.length < 12) {
          setLoadMore(false);
        }

        setImages(prevState => [...prevState, ...result]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        Notification();
      }
    };
    getFeth();
  }, [page, searchQuery]);

  const loadMoreImg = () => {
    setPage(prevState => prevState + 1);
  };

  const ToglModal = () => {
    setShowModal(!showModal);
  };

  const FindModalImage = (id, tags, img) => {
    setModalImage({ id: id, img: img, tags: tags });
  };

  const hendleFormSubmit = data => {
    setSearchQuery(data);
    setPage(1);
    setImages([]);
    setStatus('idle');
  };

  if (status === 'idle') {
    return <Searchbar onSubmit={hendleFormSubmit} />;
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={hendleFormSubmit} />
        <ImageGallery images={images} />
        <Loader />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={hendleFormSubmit} />
        <ImageGallery
          images={images}
          modalImage={FindModalImage}
          toggleModal={ToglModal}
        />
        {showModal && <Modal modalImage={modalImage} closeModal={ToglModal} />}
        {loadMore && <Button loadMore={loadMoreImg} />}
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={hendleFormSubmit} />
        <Toast />
      </>
    );
  }
};
