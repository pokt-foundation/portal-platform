import { expect } from "vitest"
import AppAddressCard from "./AppAddressCard"
import { render, screen } from "test/helpers"
import { ProcessedEndpoint } from "~/models/portal/sdk"

const apps: ProcessedEndpoint["apps"] = [
  { appId: "123", address: "", publicKey: "" },
  { appId: "234", address: "", publicKey: "" },
]
const value1 = apps[0]?.appId ?? ""
const value2 = apps[1]?.appId ?? ""

describe("<AppAddressCard />", () => {
  it("renders applications passed to it", () => {
    render(<AppAddressCard apps={apps} />)
    expect(screen.getByDisplayValue(value1)).toBeInTheDocument()
    expect(screen.getByDisplayValue(value2)).toBeInTheDocument()
  })
  it("renders heading", () => {
    render(<AppAddressCard apps={apps} />)
    const heading = "POKT App Addresses"
    expect(screen.getByText(heading)).toBeInTheDocument()
  })
  it("renders number of Apps", () => {
    render(<AppAddressCard apps={apps} />)
    const numberOfApps = "2"
    expect(screen.getByText(numberOfApps)).toBeInTheDocument()
  })
  it("renders Errortext when no apps found", () => {
    render(<AppAddressCard apps={[]} />)
    const errorText = "No apps found."
    expect(screen.getByText(errorText)).toBeInTheDocument()
  })
})
