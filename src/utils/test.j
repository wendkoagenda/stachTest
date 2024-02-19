    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      const actorCreationModel: ActorCreationModel = {
        newActor: values,
        access_token: access_token,
      };
      const { data: createdAgent } = await createAgent(
        actorCreationModel
      ).unwrap();
      dispatch(closeAgentCreateDialog());
      console.log("Agent créé avec succès:", createdAgent);
    } catch (err) {
      console.error("Erreur lors de la création de l'agent:", err);
    } finally {
      setSubmitting(false);
    }
  };

  
  -------
  
  
  
  
  
  
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      const response = await dispatch(
        createAgent({ access_token: access_token, model: values })
      );
      if (response?.error?.message === "Rejected") {
        openSubmissionFailNotification();
      } else {
        dispatch(closeAgentCreateDialog());
        await fetchAgentsQuery.refetch();
        dispatch(fetchAgents({ access_token: access_token }));
        openNotification();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };


  --------