import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/global/Loading";
import ServiceForm from "../../components/service/ServiceForm";
import Service from "../../models/services/Service";
import ServiceService from "../../services/ServiceService";

const EditServiceForm = () => {
  const [service, setService] = useState(new Service());

  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setIsLoading(params.id !== undefined);
    if (params.id !== undefined) {
      ServiceService.getService(+params.id).then((service) => {
        setService(service);
        setIsLoading(false);
      });
    }
  }, [params.id]);

  return !isLoading ? <ServiceForm service={service} /> : <Loading />;
};

export default EditServiceForm;
