import { Map, OrderedMap, Record } from "immutable";
import { LOAD_ALL_CERTIFICATES, START, SUCCESS } from "../constants";
import { arrayToMap } from "../utils";

const CertificateModel = Record({
  id: null,
  category: null,
  version: null,
  hash: null,
  format: null,
  type: null,
  issuerFriendlyName: null,
  issuerName: null,
  subjectFriendlyName: null,
  subjectName: null,
  provider: null,
  uri: null,
  serial: null,
  notAfter: null,
  notBefore: null,
  organizationName: null,
  status: false,
  signatureAlgorithm: null,
  key: null,
  active: false,
});

const DefaultReducerState = Record({
  entities: new OrderedMap({}),
  loaded: false,
  loading: false,
});

export default (certificates = new DefaultReducerState(), action) => {
  const { type, certs } = action;
  switch (type) {
    case LOAD_ALL_CERTIFICATES + START:
      return certificates.set("loading", true);

    case LOAD_ALL_CERTIFICATES + SUCCESS:
      return certificates
        .update("entities", (entities) => arrayToMap(certs, CertificateModel).merge(entities))
        .set("loading", false)
        .set("loaded", true);
  }

  return certificates;
};
