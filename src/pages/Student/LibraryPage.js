import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // Make sure this path is correct for your project
import styled from 'styled-components';

// --- Styled Components (No Changes) ---
const LibraryWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  padding: 40px;
`;
const LibraryHeader = styled.h1`
  color: white;
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
`;

const DocumentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;
const Th = styled.th`
  background-color: #f2f2f2;
  padding: 15px;
  text-align: left;
  font-size: 1.1em;
  color: #333;
`;
const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
`;
const DownloadButton = styled.button`
  display: inline-block;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2980b9;
  }
  &:disabled {
    background-color: #d7eceeff;
    cursor: not-allowed;
  }
`;

function LibraryPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingDocId, setDownloadingDocId] = useState(null);

  useEffect(() => {
    const getSharedDocuments = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error("Error fetching documents:", error);
        return [];
      }
      return data;
    };

    getSharedDocuments().then(data => {
      setDocuments(data);
      setLoading(false);
    });
  }, []);

  const handleDownload = async (filePath, docId) => {
    setDownloadingDocId(docId);
    try {
      const { data, error } = await supabase
        .storage
        .from('documents') // This must match your bucket name
        .createSignedUrl(filePath, 300); // Create a temporary link valid for 5 minutes

      if (error) {
        throw error;
      }

      window.open(data.signedUrl, '_blank');

    } catch (error) {
      alert("Error preparing download: " + error.message);
    } finally {
      setDownloadingDocId(null);
    }
  };

  if (loading) return <p>Loading documents...</p>;

  return (
    <LibraryWrapper>
      <LibraryHeader>📚 Digital Resource Library</LibraryHeader>
      <p style={{ color: '#faf5f5ff' }}>Here you can find all the documents and resources shared by your instructor.</p>
      
      <DocumentTable>
        <thead>
          <tr>
            <Th>File Name</Th>
            <Th>Uploaded On</Th>
            <Th>Download</Th>
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? (
            documents.map(doc => (
              <tr key={doc.id}>
                <Td>{doc.file_name}</Td>
                <Td>{new Date(doc.uploaded_at).toLocaleDateString('en-IN')}</Td>
                <Td>
                  <DownloadButton 
                    onClick={() => handleDownload(doc.file_path, doc.id)}
                    disabled={downloadingDocId === doc.id}
                  >
                    {downloadingDocId === doc.id ? 'Preparing...' : 'Download'}
                  </DownloadButton>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="3" style={{ textAlign: 'center' }}>No documents have been shared yet.</Td>
            </tr>
          )}
        </tbody>
      </DocumentTable>
    </LibraryWrapper>
  );
}

export default LibraryPage;