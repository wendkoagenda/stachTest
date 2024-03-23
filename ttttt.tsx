  // Hook de récupération  de l'état  de rafraichissement
  const refreshStudentList = useAppSelector(
    (state) => state.teachers.refreshStudentList
  );

  const [refreshStudentListLocal, setRefreshStudentListLocal] = useState(false);

  useEffect(() => {
    setRefreshStudentListLocal(refreshStudentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refreshStudentList]);