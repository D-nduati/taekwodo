const express = require("express");
const Cert = express.Router();
const {CreateCertificate,DownloadCertificate}  = require("../Controlers/CertificateController")

Cert.post("/generate", CreateCertificate);
Cert.get("/download/:id", DownloadCertificate);

module.exports = {Cert};
