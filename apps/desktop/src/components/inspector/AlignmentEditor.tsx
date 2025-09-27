import { useAlignmentEventStore } from "@/stores/AlignmentEventStore";
import RegisteredActionButton from "../RegisteredActionButton";
import { RegisteredActionsObjects } from "@/utilities/RegisteredActionsHandler";
import { InspectorCollapsible } from "./InspectorCollapsible";
import { Button } from "@openmarch/ui";
import { T } from "@tolgee/react";

export default function AlignmentEditor() {
    const {
        alignmentEvent,
        alignmentEventMarchers,
        alignmentEventNewMarcherPages,
    } = useAlignmentEventStore();

    return (
        alignmentEvent === "line" ||
        (alignmentEvent === "circle" && (
            <InspectorCollapsible
                defaultOpen
                title={`Alignment`}
                className="mt-12 flex flex-col gap-12"
            >
                <div className="flex flex-wrap items-center gap-8">
                    {alignmentEventNewMarcherPages.length > 0 ? (
                        <>
                            <RegisteredActionButton
                                registeredAction={
                                    RegisteredActionsObjects.createMarcherShape
                                }
                            >
                                <Button size="compact">
                                    <T keyName="inspector.alignment.createShape" />
                                </Button>
                            </RegisteredActionButton>
                            <RegisteredActionButton
                                registeredAction={
                                    RegisteredActionsObjects.applyQuickShape
                                }
                            >
                                <Button size="compact" variant="secondary">
                                    <T keyName="inspector.alignment.applyCoordinates" />
                                </Button>
                            </RegisteredActionButton>
                        </>
                    ) : (
                        <p className="text-body text-text/75">
                            <T keyName="inspector.alignment.drawLine" />
                        </p>
                    )}
                    <RegisteredActionButton
                        registeredAction={
                            RegisteredActionsObjects.cancelAlignmentUpdates
                        }
                    >
                        <Button size="compact" variant="secondary">
                            <T keyName="inspector.alignment.cancelUpdates" />
                        </Button>
                    </RegisteredActionButton>
                </div>
                <p className="text-sub text-text/80 font-mono">
                    Marchers{" "}
                    {alignmentEventMarchers
                        .map((marcher) => marcher.drill_number)
                        .join(", ")}
                </p>
            </InspectorCollapsible>
        ))
    );
}
