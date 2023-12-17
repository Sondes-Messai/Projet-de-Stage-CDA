import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomerForm from "../../components/customer/CustomerForm";
import Loading from "../../components/global/Loading";
import Customer from "../../models/Customers/Customer";
import CustomerService from "../../services/CustomerService";

const EditCustomerForm = () => {
  const [customer, setCustomer] = useState(new Customer());
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setIsLoading(params.id !== undefined);
    if (params.id !== undefined) {
      CustomerService.getCustomer(+params.id)
        .then((customer) => {
          setCustomer(customer);
          setIsLoading(false);
        })
        .catch((reason) => console.error(reason));
    }
  }, [params.id]);

  return !isLoading ? <CustomerForm customer={customer} /> : <Loading />;
};

export default EditCustomerForm;
