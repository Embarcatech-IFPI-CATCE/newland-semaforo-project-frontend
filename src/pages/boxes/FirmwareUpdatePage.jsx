import React, { useState, useEffect } from 'react';
import { FaMicrochip, FaUpload, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import api from '../../services/api'; 
import './FirmwareUpdatePage.css';

const FirmwareUpdatePage = () => {
  const [file, setFile] = useState(null);
  const [targetBox, setTargetBox] = useState('all');
  const [availableBoxes, setAvailableBoxes] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  // Busca as boxes cadastradas no backend para preencher o Select (opcional, mas recomendado)
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await api.get('/boxes'); // Assumindo que você tem essa rota
        setAvailableBoxes(response.data);
      } catch (error) {
        console.error("Erro ao buscar boxes. Usando opções padrão.", error);
      }
    };
    fetchBoxes();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.bin')) {
      setFile(selectedFile);
      setStatus('idle');
      setMessage('');
    } else {
      setFile(null);
      setStatus('error');
      setMessage('Por favor, selecione um arquivo de firmware válido (.bin).');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('error');
      setMessage('Nenhum arquivo selecionado.');
      return;
    }

    setStatus('loading');
    setMessage('Enviando firmware e reiniciando as boxes... Aguarde.');

    // 1. Criação do FormData conforme a documentação
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetBox', targetBox);

    try {
      // 2. Envio via Axios (NÃO colocar headers de Content-Type aqui!)
      const response = await api.post('/ota/upload', formData);
      
      setStatus('success');
      setMessage(response.data || 'Atualização de firmware enviada com sucesso!');
      setFile(null); // Limpa o arquivo após o sucesso
      
      // Reseta o input de arquivo visualmente
      document.getElementById('firmware-upload-input').value = '';
    } catch (error) {
      console.error('Erro no upload OTA:', error);
      setStatus('error');
      setMessage('Falha ao enviar a atualização. Verifique a conexão com o servidor.');
    }
  };

  return (
    <div className="ota-page-container">
      <div className="ota-card">
        <div className="ota-header">
          <FaMicrochip className="ota-icon" />
          <h2>Atualização de Firmware OTA</h2>
          <p>Envie arquivos <strong>.bin</strong> compilados para atualizar remotamente os ESP32 das boxes da oficina.</p>
        </div>

        <form onSubmit={handleUpload} className="ota-form">
          
          <div className="form-group">
            <label htmlFor="targetBox">Box de Destino (Alvo)</label>
            <div className="custom-select-wrapper">
              <select 
                id="targetBox" 
                value={targetBox} 
                onChange={(e) => setTargetBox(e.target.value)}
              >
                <option value="all">Todas as Boxes (Geral)</option>
                {/* Se a API retornou as boxes, lista elas. Se não, mostra opções fixas para teste */}
                {availableBoxes.length > 0 ? (
                  availableBoxes.map((box) => (
                    <option key={box.id} value={box.identifier || box.id}>
                      {box.identifier || `Box ${box.id}`}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="BOX-01">Box 01</option>
                    <option value="BOX-02">Box 02</option>
                    <option value="BOX-03">Box 03</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Arquivo do Firmware (.bin)</label>
            <div className={`file-drop-area ${file ? 'has-file' : ''}`}>
              <FaUpload className="upload-icon" />
              <span className="file-message">
                {file ? file.name : 'Clique para selecionar ou arraste o arquivo .bin aqui'}
              </span>
              <input 
                type="file" 
                id="firmware-upload-input"
                accept=".bin" 
                onChange={handleFileChange} 
                className="file-input"
              />
            </div>
          </div>

          {/* Área de Feedback Visual */}
          {status === 'loading' && (
            <div className="feedback-message loading">
              <FaSpinner className="spinner" /> {message}
            </div>
          )}
          {status === 'success' && (
            <div className="feedback-message success">
              <FaCheckCircle /> {message}
            </div>
          )}
          {status === 'error' && (
            <div className="feedback-message error">
              <FaExclamationTriangle /> {message}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-submit-ota" 
            disabled={!file || status === 'loading'}
          >
            {status === 'loading' ? 'Atualizando...' : 'Atualizar Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirmwareUpdatePage;