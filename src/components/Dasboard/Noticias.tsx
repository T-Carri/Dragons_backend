import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Image {
  id: string;
  url: string;
  title: string;
  description: string;
  postDate: string;
}


function Noticias() {

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/noticias/');
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);

    try {
      await axios.post('https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/uploadnoticias', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axios.get('https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/noticias');
      setImages(response.data);
      setSelectedFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
/* 
  const handlePreview = (image: Image) => {
    setSelectedImage(image);
    
    // Asegúrate de que el modal está siendo inicializado correctamente
    const modalElement = document.getElementById('previewModal');
    
    if (modalElement) {
      const previewModal = new bootstrap.Modal(modalElement);
      previewModal.show();
    }
  }; */

/*   const handleEdit = async () => {
    if (selectedImage) {
      try {
        const response = await axios.put(`https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/gallery/${selectedImage.id}`, {
          title,
          description,
        });
        console.log('Respuesta de edición:', response.data); // Depuración
        const updatedImages = await axios.get('https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/gallery');
        setImages(updatedImages.data);
        const editModal = new window.bootstrap.Offcanvas(document.getElementById('editModal') as Element);
        editModal.hide();
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error al editar la imagen:', error);
      }
    }
  };
 */
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      try {
        await axios.delete(`https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/noticias/${id}`);
        const response = await axios.get('https://heroic-torrone-6e5f03.netlify.app/.netlify/functions/api/api/noticias');
        setImages(response.data);
      } catch (error) {
        console.error('Error al eliminar la imagen react:', error);
      }
    }
  };

  if (loading) {
    return <p>Cargando imágenes...</p>;
  }





  return (
    <div style={{ height: '80vh' }}>
    <div className="d-flex justify-content-between">
      <div>
        <span>Noticias</span>
      </div>
      <div>
        <button
          className="btn bg-success text-white"
          style={{ fontWeight: '600' }}
          data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
        >
          + Agregar noticias
        </button>
      </div>
    </div>

    <div className="container__images__gallery" style={{ height: '100%', padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {images.map((image) => (
          <div key={image.id} className="card" style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px' }}>
            <img
              src={image.url}
              alt={image.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            />
            <div className="card-body">
              <h5 className="card-title">{image.title}</h5>
              <p className="card-text">{image.description}</p>
              <p className="card-text"><small className="text-muted">{image.postDate}</small></p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(image.id)}>Eliminar</button>
             {/*    <button
                  className="btn btn-warning btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#editModal"
                  aria-controls="editModal"
                  onClick={() => {
                    setSelectedImage(image);
                    setTitle(image.title);
                    setDescription(image.description);
                  }}
                >
                  Editar
                </button> */}
              {/*   <button
                  className="btn btn-info btn-sm"
                  onClick={() => handlePreview(image)}
                >
                  Vista previa
                </button> */}

                <button
  className="btn btn-info btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#previewModal"
  onClick={() => setSelectedImage(image)}
>
  Vista previa
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">Subir imagen</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column align-items-center">
        <input className='btn ' type="file" onChange={handleFileChange} />
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Título de la imagen"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Descripción de la imagen"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button
          className="btn bg-success text-white mt-4"
          style={{ fontWeight: '600' }}
          onClick={handleUpload}
        >
          + Agregar imagen
        </button>
      </div>
    </div>

    {/* Modal para vista previa */}
    <div className="modal fade" id="previewModal" tabIndex={-1} aria-labelledby="previewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="previewModalLabel">Vista previa de la imagen</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {selectedImage && (
              <div>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
                <h5 className="mt-2">{selectedImage.title}</h5>
                <p>{selectedImage.description}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    {/* Modal para editar */}
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="editModal" aria-labelledby="editModalLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="editModalLabel">Editar imagen</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column align-items-center">
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Título de la imagen"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Descripción de la imagen"
          value={description}
          onChange={handleDescriptionChange}
        />
     {/*    <button
          className="btn bg-warning text-white mt-4"
          style={{ fontWeight: '600' }}
          onClick={handleEdit}
        >
          Guardar cambios
        </button> */}
      </div>
    </div>


    <div className="modal fade" id="previewModal" tabIndex={-1} aria-labelledby="previewModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="previewModalLabel">Vista previa de la imagen</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {selectedImage && (
          <div>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
            <h5 className="mt-2">{selectedImage.title}</h5>
            <p>{selectedImage.description}</p>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


  </div>
  )
}

export default Noticias