/**
 * ============================================================
 * OFFICIAL ICI REGISTRATION CONFIGURATION
 * ============================================================
 * 
 * Replace the REGISTRATION_URL below with the official ICI registration
 * link when it is provided.
 * 
 * All "REGISTER NOW" and "REGISTER YOUR TEAM" buttons across the website
 * reference this single variable.
 */
export const REGISTRATION_URL: string = "[ICI_REGISTRATION_URL]";

// Official rule: Teams must consist of EXACTLY 3 PLAYERS.
export const TEAM_SIZE: string = "3 PLAYERS";
export const TEAM_SIZE_LABEL: string = "3 PLAYERS PER TEAM";
export const TEAM_SIZE_RULE: string = "EXACTLY 3 PLAYERS PER TEAM";

/**
 * Global click handler for all registration CTAs.
 * Redirects to the configured registration URL or alerts with the rule
 * if still in placeholder mode.
 */
export function handleRegistrationRedirect() {
  if (
    REGISTRATION_URL &&
    REGISTRATION_URL !== "[ICI_REGISTRATION_URL]" &&
    (REGISTRATION_URL.startsWith("http://") || REGISTRATION_URL.startsWith("https://"))
  ) {
    window.open(REGISTRATION_URL, "_blank", "noopener,noreferrer");
  } else {
    alert(
      `ICI FEST 2026 — AI UNLEASHED REGISTRATION\n\nOfficial ICI Registration link will be activated here shortly.\n\nIMPORTANT TEAM REQUIREMENT:\n${TEAM_SIZE_RULE}\n\nConfig Location:\nsrc/config/registration.ts`
    );
  }
}

