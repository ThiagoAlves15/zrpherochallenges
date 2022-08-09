function EditHero() {
  return (
    <>
      { loading ? <p>Loading ...</p> : <Outlet />}
    </>
  );
}

export default EditHero;