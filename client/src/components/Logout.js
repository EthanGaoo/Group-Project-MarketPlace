const Logout = (props) => {
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST",
    });
    const data = await res.json();
    props.handleLogout();
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default Logout;
