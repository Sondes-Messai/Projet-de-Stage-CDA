import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovementForm from "../../components/balance/MovementForm";
import Loading from "../../components/global/Loading";
import Movement from "../../models/Balance/Movement";
import BalanceService from "../../services/BalanceService";

const EditMovementForm = () => {
  const [movement, setMovement] = useState(new Movement());
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setIsLoading(params.id !== undefined);
    if (params.id !== undefined) {
      BalanceService.getMovement(+params.id)
        .then((mvt) => {
          setMovement(mvt);
          setIsLoading(false);
        })
        .catch((reason) => console.error(reason));
    }
  }, [params.id]);

  return !isLoading ? <MovementForm movement={movement} /> : <Loading />;
};

export default EditMovementForm;
