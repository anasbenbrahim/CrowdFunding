import React, { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Form, Nav, Navbar, Modal } from 'react-bootstrap';
import { RiAddLine, RiArrowDownSLine, RiEyeLine, RiEditLine, RiDeleteBinLine, RiUserLine, RiSearchLine } from '@remixicon/react';
import './App.css';
import logoImage from '../../Components/Assets/CoFund logo2.png';

function App() {
  // États pour les campagnes et le filtrage
  const [activeTab, setActiveTab] = useState('all');
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Smart Water Bottle",
      description: "A smart water bottle that tracks your hydration.",
      status: "active",
      currentAmount: 18750,
      targetAmount: 25000,
      contributors: 124,
      daysLeft: 12,
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      community: 'Tech Startups'
    },
    {
      id: 2,
      title: "Eco-Friendly Backpack",
      description: "An eco-friendly backpack made from recycled materials.",
      status: "completed",
      currentAmount: 15000,
      targetAmount: 15000,
      contributors: 89,
      daysLeft: 25,
      startDate: '2023-05-01',
      endDate: '2023-05-31',
      community: 'Eco Innovators'
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Development of an innovative mobile application.",
      status: "archived",
      currentAmount: 28900,
      targetAmount: 35000,
      contributors: 234,
      daysLeft: 8,
      startDate: '2023-04-01',
      endDate: '2023-04-30',
      community: 'Tech Startups'
    }
  ]);

  // États pour les modals
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    targetAmount: '',
    startDate: '',
    endDate: '',
    community: ''
  });

  // Filtrage des campagnes
  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return campaign.status === 'active';
    if (activeTab === 'completed') return campaign.status === 'completed';
    if (activeTab === 'archived') return campaign.status === 'archived';
    return true;
  });

  // Gestion des changements de formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCampaignForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCampaign) {
      // Mise à jour de la campagne existante
      setCampaigns(campaigns.map(camp => 
        camp.id === editingCampaign.id ? { ...camp, ...campaignForm } : camp
      ));
    } else {
      // Création d'une nouvelle campagne
      const newCampaign = {
        id: Math.max(...campaigns.map(c => c.id)) + 1,
        ...campaignForm,
        status: "active",
        currentAmount: 0,
        contributors: 0,
        daysLeft: Math.ceil((new Date(campaignForm.endDate) - new Date()) / (1000 * 60 * 60 * 24))
      };
      setCampaigns([...campaigns, newCampaign]);
    }
    
    // Fermeture de la modal et réinitialisation
    handleCloseModal();
  };

  // Suppression d'une campagne
  const handleDelete = () => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== campaignToDelete.id));
    setShowDeleteModal(false);
    setCampaignToDelete(null);
  };

  // Ouverture de la modal en mode édition
  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      title: campaign.title,
      description: campaign.description,
      targetAmount: campaign.targetAmount,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      community: campaign.community
    });
    setShowCampaignModal(true);
  };

  // Ouverture de la modal de confirmation de suppression
  const confirmDelete = (campaign) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  // Fermeture des modals
  const handleCloseModal = () => {
    setShowCampaignModal(false);
    setEditingCampaign(null);
    setCampaignForm({
      title: '',
      description: '',
      targetAmount: '',
      startDate: '',
      endDate: '',
      community: ''
    });
  };

  // Fonctions utilitaires pour le style
  const getStatusVariant = (status) => {
    switch(status) {
      case 'active': return 'primary';
      case 'completed': return 'success';
      case 'archived': return 'secondary';
      default: return 'primary';
    }
  };

  const getProgressBarVariant = (status) => {
    switch(status) {
      case 'active': return 'primary';
      case 'completed': return 'success';
      case 'archived': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <div className="App bg-light min-vh-100">
      {/* Main Content */}
      <main className="py-4">
        <Container>
          {/* Page Header */}
          <Row className="mb-4 align-items-center">
            <Col md={8}>
              <h1 className="fw-bold mb-2">Campaign Manager</h1>
              <p className="text-muted">Create, manage and track your crowdfunding campaigns</p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button 
                variant="primary" 
                className="d-inline-flex align-items-center"
                onClick={() => setShowCampaignModal(true)}
              >
                <RiAddLine className="me-2" /> New Campaign
              </Button>
            </Col>
          </Row>

          {/* Filters and Search */}
          <Row className="mb-4 align-items-center">
            <Col xs={12} md={8} className="mb-3 mb-md-0">
              <div className="d-flex overflow-auto pb-2">
                <Button 
                  variant="light"
                  className={`me-2 text-nowrap border-0 border-bottom ${activeTab === 'all' ? 'text-primary border-primary border-2' : 'border-transparent'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Campaigns
                </Button>
                <Button 
                  variant="light"
                  className={`me-2 text-nowrap border-0 border-bottom ${activeTab === 'active' ? 'text-primary border-primary border-2' : 'border-transparent'}`}
                  onClick={() => setActiveTab('active')}
                >
                  Active
                </Button>
                <Button 
                  variant="light"
                  className={`me-2 text-nowrap border-0 border-bottom ${activeTab === 'completed' ? 'text-primary border-primary border-2' : 'border-transparent'}`}
                  onClick={() => setActiveTab('completed')}
                >
                  Completed
                </Button>
                <Button 
                  variant="light"
                  className={`me-2 text-nowrap border-0 border-bottom ${activeTab === 'archived' ? 'text-primary border-primary border-2' : 'border-transparent'}`}
                  onClick={() => setActiveTab('archived')}
                >
                  Archived
                </Button>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="position-relative">
                <Form.Control 
                  type="search" 
                  placeholder="Search for a campaign..." 
                  className="ps-5"
                />
                <RiSearchLine className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              </Form.Group>
            </Col>
          </Row>

          {/* Campaign Cards */}
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredCampaigns.map(campaign => (
              <Col key={campaign.id}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className={`badge bg-${getStatusVariant(campaign.status)}-subtle text-${getStatusVariant(campaign.status)}`}>
                        {campaign.status === 'active' && 'Active'}
                        {campaign.status === 'completed' && 'Completed'}
                        {campaign.status === 'archived' && 'Archived'}
                      </span>
                      <div>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-muted p-1"
                          onClick={() => handleEdit(campaign)}
                        >
                          <RiEditLine />
                        </Button>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-muted p-1"
                          onClick={() => confirmDelete(campaign)}
                        >
                          <RiDeleteBinLine />
                        </Button>
                      </div>
                    </div>

                    <Card.Title className="mb-2">{campaign.title}</Card.Title>
                    <Card.Text className="text-muted mb-3">{campaign.description}</Card.Text>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-medium">{campaign.currentAmount.toLocaleString()}€</span>
                        <span className="text-muted">out of {campaign.targetAmount.toLocaleString()}€</span>
                      </div>
                      <ProgressBar 
                        variant={getProgressBarVariant(campaign.status)}
                        now={(campaign.currentAmount / campaign.targetAmount) * 100} 
                        className="progress-thin"
                      />
                    </div>

                    <div className="d-flex justify-content-between small text-muted">
                      <div className="d-flex align-items-center">
                        <RiUserLine className="me-1" />
                        <span>{campaign.contributors} contributors</span>
                      </div>
                      <div>
                        {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Ended'}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      {/* Campaign Modal (Create/Edit) */}
      <Modal 
        show={showCampaignModal} 
        onHide={handleCloseModal}
        dialogClassName="modal-lg modal-dialog-centered modal-dialog-scrollable"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">
            {editingCampaign ? 'Edit your campaign details' : 'Fill in the details of your new crowdfunding campaign'}
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Campaign Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter campaign title" 
                name="title"
                value={campaignForm.title}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describe your campaign" 
                name="description"
                value={campaignForm.description}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Funding Goal (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Target amount" 
                    name="targetAmount"
                    value={campaignForm.targetAmount}
                    onChange={handleFormChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Start Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="startDate"
                    value={campaignForm.startDate}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">End Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="endDate"
                    value={campaignForm.endDate}
                    onChange={handleFormChange}
                    min={campaignForm.startDate}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Associated Communities</Form.Label>
              <Form.Select
                name="community"
                value={campaignForm.community}
                onChange={handleFormChange}
                required
              >
                <option value="">Select a community</option>
                <option value="Eco Innovators">Eco Innovators</option>
                <option value="Tech Startups">Tech Startups</option>
                <option value="Art & Creativity">Art & Creativity</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end pt-3 border-top">
              <Button 
                variant="outline-secondary" 
                className="me-3"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingCampaign ? 'Save Changes' : 'Create Campaign'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the campaign "{campaignToDelete?.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;