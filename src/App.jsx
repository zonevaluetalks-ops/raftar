import { useMemo, useState } from 'react';

const modules = [
  'Dashboard',
  'Lead Management',
  'Properties',
  'Deal Room',
  'B2B Marketplace',
  'Market Intelligence',
  'Chat',
  'Billing',
  'Settings'
];

const kpis = [
  ['Total Leads', '1,284', '+12%'],
  ['Bookings', '146', '+9%'],
  ['Monthly Revenue', '₹2.4Cr', '+14%'],
  ['Conversion Rate', '18.2%', '+2.1%'],
  ['Avg. Deal Size', '₹1.67Cr', '+6%']
];

const leads = [
  { name: 'Aarav Mehta', score: 91, status: 'New', source: 'Website', budget: '₹1.8Cr' },
  { name: 'Riya Sharma', score: 82, status: 'Follow Up', source: 'Referral', budget: '₹1.2Cr' },
  { name: 'Kabir Singh', score: 64, status: 'Visit Scheduled', source: 'Meta Ads', budget: '₹95L' },
  { name: 'Nisha Iyer', score: 49, status: 'Nurture', source: 'WhatsApp', budget: '₹72L' }
];

const properties = [
  { name: 'Skyline Crest', builder: 'Apex Builders', price: '₹95L - ₹1.8Cr', units: 210, tag: 'Luxury', available: true },
  { name: 'Urban Grove', builder: 'Greenfield Homes', price: '₹65L - ₹1.2Cr', units: 320, tag: 'Family', available: true },
  { name: 'Nova Heights', builder: 'Zentrix Realty', price: '₹1.2Cr - ₹2.4Cr', units: 140, tag: 'Premium', available: false },
  { name: 'Metro Aura', builder: 'Wave Infra', price: '₹48L - ₹92L', units: 410, tag: 'Value', available: true }
];

const deals = {
  Lead: ['Aarav - Skyline Crest', 'Rohan - Metro Aura'],
  Visit: ['Riya - Urban Grove'],
  Negotiation: ['Kabir - Nova Heights'],
  Booking: ['Nisha - Skyline Crest'],
  Closed: ['Dev - Urban Grove']
};

const messagesSeed = [
  { from: 'them', text: 'Hi, can I get ROI projections for Skyline Crest?' },
  { from: 'me', text: 'Absolutely. Current projected ROI is ~17.5% over 3 years.' }
];

function scoreBand(score) {
  if (score >= 80) return ['Hot', 'hot'];
  if (score >= 60) return ['Warm', 'warm'];
  return ['Cold', 'cold'];
}

function Dashboard() {
  return (
    <div className="stack">
      <div className="kpi-grid">
        {kpis.map(([title, value, delta]) => (
          <div className="card" key={title}>
            <div className="label">{title}</div>
            <div className="value">{value}</div>
            <div className="delta">{delta} vs last month</div>
          </div>
        ))}
      </div>
      <div className="split">
        <div className="card">
          <h3>Monthly Performance</h3>
          <div className="bars">
            {[62, 74, 58, 84, 79, 92].map((h, i) => (
              <div key={i} className="bar-wrap"><div className="bar" style={{ height: `${h}%` }} /></div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Lead Funnel</h3>
          <div className="donut" />
          <p>Qualified 38% • Site Visit 24% • Negotiation 15%</p>
        </div>
      </div>
      <div className="card">
        <h3>Recent Hot Leads</h3>
        <table>
          <thead><tr><th>Name</th><th>Score</th><th>Status</th><th>Budget</th></tr></thead>
          <tbody>
            {leads.filter((l) => l.score >= 80).map((lead) => (
              <tr key={lead.name}><td>{lead.name}</td><td>{lead.score}</td><td>{lead.status}</td><td>{lead.budget}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeadManagement() {
  return (
    <div className="card">
      <h3>Lead Pipeline</h3>
      <table>
        <thead><tr><th>Lead</th><th>AI Score</th><th>Status</th><th>Source</th><th>Actions</th></tr></thead>
        <tbody>
          {leads.map((lead) => {
            const [label, cls] = scoreBand(lead.score);
            return (
              <tr key={lead.name}>
                <td>{lead.name}</td>
                <td><span className={`badge ${cls}`}>{label} {lead.score}</span></td>
                <td><span className="pill">{lead.status}</span></td>
                <td>{lead.source}</td>
                <td><button>Call</button> <button>Email</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Properties() {
  return (
    <div className="property-grid">
      {properties.map((property) => (
        <div className="card" key={property.name}>
          <h3>{property.name}</h3>
          <p>{property.builder}</p>
          <p>{property.price}</p>
          <p>{property.units} units</p>
          <div className="row">
            <span className="pill">{property.tag}</span>
            <span className={`badge ${property.available ? 'hot' : 'cold'}`}>{property.available ? 'Available' : 'Sold Out'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DealRoom() {
  return (
    <div className="kanban">
      {Object.entries(deals).map(([stage, list]) => (
        <div className="column" key={stage}>
          <h4>{stage}</h4>
          {list.map((item) => <div className="deal" key={item}>{item}</div>)}
        </div>
      ))}
    </div>
  );
}

function B2BMarketplace() {
  const [view, setView] = useState('builder');
  return (
    <div className="stack">
      <div className="segmented">
        <button className={view === 'builder' ? 'active' : ''} onClick={() => setView('builder')}>Builder Panel</button>
        <button className={view === 'broker' ? 'active' : ''} onClick={() => setView('broker')}>Broker Panel</button>
      </div>
      {view === 'builder' ? (
        <div className="card">
          <h3>Top Brokers</h3>
          <ul><li>PrimeKeys — 38 deals</li><li>Homestar — 24 deals</li><li>Nexus Realty — 19 deals</li></ul>
          <h4>Commission Distribution</h4>
          <div className="line-chart" />
        </div>
      ) : (
        <div className="card">
          <h3>Project Browser</h3>
          <ul><li>Skyline Crest — 4% payout</li><li>Urban Grove — 3.2% payout</li><li>Metro Aura — 2.8% payout</li></ul>
        </div>
      )}
    </div>
  );
}

function MarketIntelligence() {
  const [investment, setInvestment] = useState(120);
  const [years, setYears] = useState(3);
  const roi = useMemo(() => ((investment * 1.12 ** years) - investment).toFixed(1), [investment, years]);

  return (
    <div className="stack">
      <div className="card">
        <h3>ROI Calculator</h3>
        <label>Investment (Lakh): {investment}</label>
        <input type="range" min="50" max="300" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
        <label>Years: {years}</label>
        <input type="range" min="1" max="10" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        <p>Projected Return: <strong>{roi}L</strong></p>
      </div>
      <div className="split">
        <div className="card">
          <h3>Price Trend</h3>
          <div className="line-chart" />
        </div>
        <div className="card">
          <h3>Location Heatmap</h3>
          <div className="heatmap">
            {['Gurgaon', 'Noida', 'Thane', 'Whitefield', 'Gachibowli', 'Pune West'].map((loc) => (
              <div key={loc} title={loc}>{loc}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState(messagesSeed);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: 'me', text }]);
    setText('');
  };

  return (
    <div className="chat-layout">
      <div className="contacts card">
        <h3>Contacts</h3>
        <p>Aarav Mehta</p><p>Riya Sharma</p><p>Kabir Singh</p>
      </div>
      <div className="chat card">
        <h3>WhatsApp Style Chat</h3>
        <div className="chat-box">
          {messages.map((m, i) => <div key={i} className={`msg ${m.from}`}>{m.text}</div>)}
        </div>
        <div className="row">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message" />
          <button onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}

function Billing() {
  return (
    <div className="stack">
      <div className="split">
        <div className="card"><h3>Basic</h3><p className="value">₹1,999</p></div>
        <div className="card"><h3>Pro</h3><p className="value">₹4,999</p></div>
      </div>
      <div className="card">
        <h3>Billing History</h3>
        <table>
          <thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>2026-04-02</td><td>Pro</td><td>₹4,999</td><td>Paid</td></tr>
            <tr><td>2026-03-02</td><td>Pro</td><td>₹4,999</td><td>Paid</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="card stack">
      <h3>Profile</h3>
      <input placeholder="Name" defaultValue="Admin User" />
      <input placeholder="Email" defaultValue="admin@zonevalue.ai" />
      <label><input type="checkbox" defaultChecked /> WhatsApp Alerts</label>
      <label><input type="checkbox" defaultChecked /> Email Notifications</label>
      <label><input type="checkbox" /> Weekly Reports</label>
      <button>Save</button>
    </div>
  );
}

function AIPanel() {
  return (
    <aside className="assistant">
      <h3>AI Assistant</h3>
      <div className="card mini">
        <h4>Next Best Actions</h4>
        <p><span className="badge hot">High</span> Call Aarav before 5 PM</p>
        <p><span className="badge warm">Med</span> Share brochure with Riya</p>
      </div>
      <div className="card mini">
        <h4>Pitch Generator</h4>
        <p>"Skyline Crest offers premium lifestyle + strong rental yield."</p>
      </div>
      <div className="card mini">
        <h4>Live Notifications</h4>
        <ul><li>🔥 Hot lead detected</li><li>✅ Deal closed</li><li>📍 Visit confirmed</li></ul>
      </div>
      <div className="card mini">
        <h4>Market Pulse</h4>
        <p>Mumbai: ₹24,800/sqft</p>
        <p>Bengaluru: ₹13,400/sqft</p>
        <p>Gurgaon: ₹16,200/sqft</p>
      </div>
    </aside>
  );
}

export default function App() {
  const [active, setActive] = useState('Dashboard');

  const content = {
    Dashboard: <Dashboard />,
    'Lead Management': <LeadManagement />,
    Properties: <Properties />,
    'Deal Room': <DealRoom />,
    'B2B Marketplace': <B2BMarketplace />,
    'Market Intelligence': <MarketIntelligence />,
    Chat: <Chat />,
    Billing: <Billing />,
    Settings: <Settings />
  };

  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>ZoneValue AI</h2>
        {modules.map((module) => (
          <button key={module} className={active === module ? 'active' : ''} onClick={() => setActive(module)}>{module}</button>
        ))}
      </nav>
      <main className="main">
        <h1>{active}</h1>
        {content[active]}
      </main>
      <AIPanel />
    </div>
  );
}
