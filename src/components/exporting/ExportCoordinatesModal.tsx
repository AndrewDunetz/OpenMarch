import * as Form from "@/components/templates/Form";
import ModalLauncher from "../topbar/ModalLauncher";
import { useCallback, useState } from "react";
import { topBarComponentProps } from "@/global/Interfaces";
import MarcherCoordinateSheet, {
    StaticMarcherCoordinateSheet,
} from "./MarcherCoordinateSheet";
import ReactDOMServer from "react-dom/server";
import { useFieldProperties } from "@/context/fieldPropertiesContext";
import { useMarcherStore } from "@/stores/MarcherStore";
import { usePageStore } from "@/stores/PageStore";
import { useMarcherPageStore } from "@/stores/MarcherPageStore";

function ExportModalContents() {
    const [isTerse, setIsTerse] = useState(false);
    const [includeMeasures, setIncludeMeasures] = useState(true);
    const [useXY, setUseXY] = useState(false);
    const [roundingDenominator, setRoundingDenominator] = useState(4);
    const { marchers } = useMarcherStore()!;
    const { pages } = usePageStore()!;
    const { marcherPages } = useMarcherPageStore()!;
    const { fieldProperties } = useFieldProperties()!;
    const [isLoading, setIsLoading] = useState(false);
    // const fourSheets = useRef(false);

    const handleExport = useCallback(() => {
        if (!fieldProperties)
            throw new Error("Field properties not found in context");

        const coordinateSheets: string[] = [];
        marchers.forEach((marcher) => {
            console.log("marcher", marcher);
            coordinateSheets.push(
                ReactDOMServer.renderToString(
                    <StaticMarcherCoordinateSheet
                        marcher={marcher}
                        pages={pages}
                        marcherPages={marcherPages}
                        includeMeasures={includeMeasures}
                        terse={isTerse}
                        useXY={useXY}
                        fieldProperties={fieldProperties}
                        roundingDenominator={roundingDenominator}
                    />
                )
            );
        });
        setIsLoading(true);
        window.electron
            .sendExportIndividualCoordinateSheets(coordinateSheets)
            .then(() => setIsLoading(false));
    }, [
        fieldProperties,
        marchers,
        pages,
        marcherPages,
        includeMeasures,
        isTerse,
        useXY,
        roundingDenominator,
    ]);

    return (
        <div className="">
            <h5 className="text-xl my-2">Settings</h5>
            <div className="mx-2">
                <form className="grid grid-cols-2">
                    <div className="grid grid-rows-3 gap-0">
                        <Form.Check
                            type="checkbox"
                            label="Include measures"
                            checked={includeMeasures}
                            onChange={(e) =>
                                setIncludeMeasures(e.target.checked)
                            }
                        />
                        <Form.Check
                            type="checkbox"
                            label="Abbreviate coordinate descriptions"
                            checked={isTerse}
                            onChange={(e) => setIsTerse(e.target.checked)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Use X/Y headers"
                            checked={useXY}
                            onChange={(e) => setUseXY(e.target.checked)}
                        />
                    </div>
                    <div>
                        <Form.Label>Rounding denominator:</Form.Label>
                        <div>
                            <Form.Input
                                type="number"
                                defaultValue={roundingDenominator}
                                step={1}
                                min={1}
                                onChange={(e) =>
                                    setRoundingDenominator(
                                        parseInt(e.target.value) || 4
                                    )
                                }
                            />
                        </div>
                        <p className="text-muted">
                            {"4 -> 1/4 = nearest quarter step"}
                            <br />
                            {"10 -> 1/10 = nearest tenth step"}
                        </p>
                    </div>
                </form>
            </div>
            <br />
            <h5 className="my-2 text-lg">Preview</h5>
            <div>
                <div className="mx-2" style={{ border: "2px solid #aaa" }}>
                    <MarcherCoordinateSheet
                        example={true}
                        terse={isTerse}
                        includeMeasures={includeMeasures}
                        useXY={useXY}
                        roundingDenominator={roundingDenominator || 4}
                    />
                </div>
            </div>
            <br />
            <div className="mx-2">
                <button
                    className="btn-primary"
                    onClick={handleExport}
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Exporting... Please wait"
                        : "Export Individual Coordinate Sheets"}
                </button>
            </div>
        </div>
    );
}

export default function ExportCoordinatesModal({
    className,
}: topBarComponentProps) {
    return (
        <ModalLauncher
            components={[ExportModalContents()]}
            launchButton="Export"
            header="Export Individual Coordinate Sheets"
            modalClassName="modal-lg"
            buttonClassName={`btn-primary rounded ${className}`}
        />
    );
}
