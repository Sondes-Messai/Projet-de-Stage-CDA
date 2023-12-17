import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/global/Loading";
import InvoiceForm from "../../components/invoice/InvoiceForm";
import Customer from "../../models/Customers/Customer";
import Invoice from "../../models/invoices/Invoice";
import Service from "../../models/services/Service";
import CustomerService from "../../services/CustomerService";
import InvoiceService from "../../services/InvoiceService";
import ServiceService from "../../services/ServiceService";

const EditInvoiceForm = () => {
  const [invoice, setInvoice] = useState(new Invoice());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setIsLoading(params.id !== undefined);
    CustomerService.getCustomers().then((customers) => setCustomers(customers));
    ServiceService.getServices().then((services: Service[]) =>
      setServices(services.filter((service) => service.to === undefined))
    );

    if (params.id !== undefined) {
      InvoiceService.getInvoice(+params.id).then((inv: Invoice) => {
        if (params.copy === "true") {
          let temp: Invoice = new Invoice();
          temp.amount = inv.amount;
          temp.customer = new Customer();
          temp.customer.id = inv.customer?.id;
          temp.details = inv.details;
          temp.paymentMethod = inv.paymentMethod;
          setInvoice(temp);
        } else {
          setInvoice(inv);
        }

        setIsLoading(false);
      });
    }
  }, [params.id, params.copy]);

  return !isLoading ? (
    <InvoiceForm invoice={invoice} customers={customers} services={services} />
  ) : (
    <Loading />
  );
};

export default EditInvoiceForm;
