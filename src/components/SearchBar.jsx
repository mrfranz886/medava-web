export default function SearchBar({
  query,
  setQuery,
  location,
  setLocation,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form style={styles.wrapper} onSubmit={handleSubmit}>
      <div style={styles.bar}>
        <div style={styles.section}>
          <label style={styles.label}>Equipment</label>
          <input
            style={styles.input}
            placeholder="Search MRI, ultrasound..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <label style={styles.label}>Location</label>
          <input
            style={styles.input}
            placeholder="London, Milan..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button style={styles.searchButton} type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "28px",
    width: "60%",
  },

  bar: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "999px",
    padding: "12px 16px",
    gap: "16px",
    background: "#fff",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "940px",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    minWidth: "200px",
  },

  divider: {
    width: "1px",
    height: "46px",
    background: "#e8e8e8",
  },

  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "6px",
  },

  input: {
    border: "none",
    outline: "none",
    fontSize: "15px",
    minWidth: "220px",
    width: "100%",
    padding: "8px 0",
    background: "#ffffff",
    color: "#222",
  },

  searchButton: {
    marginLeft: "auto",
    padding: "12px 24px",
    background: "#ff385c",
    color: "white",
    border: "none",
    borderRadius: "999px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 16px rgba(255,56,92,0.24)",
  },
};