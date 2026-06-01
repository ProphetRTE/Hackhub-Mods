import { Bootstrap, RegisterModPackage } from "@hotbunny/hackhub-content-sdk";
import "./themes/CustomTheme";
import "./commands/ScanCommand";
import "./apps/NotePad";
import "./websites/ExampleSite";
import "./quests/InvestigationQuest";

@RegisterModPackage
export default class CantHackThis extends Bootstrap {

    Settings = [
        {
            key: "difficulty",
            label: "Difficulty",
            type: "select" as const,
            default: "normal",
            options: [
                { label: "Easy", value: "easy" },
                { label: "Normal", value: "normal" },
                { label: "Hard", value: "hard" },
            ],
        },
        {
            key: "showHints",
            label: "Show Hints",
            type: "toggle" as const,
            default: true,
        },
    ];

    async OnModPackageLoaded() {
        console.log("[cant-hack-this] cant-hack-this loaded!");
        console.log("[cant-hack-this] Theme, command, app, website, and quest registered.");
    }

    OnModPackageUnloaded() {
        console.log("[cant-hack-this] cant-hack-this unloaded.");
    }
}
