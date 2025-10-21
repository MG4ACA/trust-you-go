import { Card } from 'primereact/card';

function CreateAdmin() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create Admin Account</h1>
      <Card title="New Admin Registration" style={{ marginTop: '1rem' }}>
        <p>Admin registration form will be implemented in Task 13</p>
        <p>Only accessible by Super Admins</p>
      </Card>
    </div>
  );
}

export default CreateAdmin;
