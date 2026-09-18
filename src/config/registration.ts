/**
 * ============================================================
 * OFFICIAL ICI REGISTRATION CONFIGURATION
 * ============================================================
 * 
 * Replace the REGISTRATION_URL below with the official ICI registration
 * link when it is provided.
 * 
 * When you receive the URL, simply update this single variable:
 * Example: export const REGISTRATION_URL: string = "https://ici-fest.org/register";
 * 
 * All "REGISTER" buttons across the website (Navbar, Hero, Final, and Stage 09)
 * reference this single variable and open the link in a new browser tab.
 */
export const REGISTRATION_URL: string = "PASTE_ICI_REGISTRATION_URL_HERE";

// Official rule: Teams must consist of EXACTLY 3 PLAYERS.
export const TEAM_SIZE: string = "3 PLAYERS";
export const TEAM_SIZE_LABEL: string = "3 PLAYERS PER TEAM";
export const TEAM_SIZE_RULE: string = "EXACTLY 3 PLAYERS PER TEAM";

/**
 * Global redirect handler for all registration CTAs.
 * Redirects the user to the official external ICI registration page in a new browser tab.
 */
export function handleRegistrationRedirect(): void {
  if (typeof window !== "undefined") {
    if (
      !REGISTRATION_URL ||
      REGISTRATION_URL === "PASTE_ICI_REGISTRATION_URL_HERE"
    ) {
      alert(
        "Official ICI registration portal link will be activated shortly. Replace 'PASTE_ICI_REGISTRATION_URL_HERE' in src/config/registration.ts with the official URL."
      );
      return;
    }

    const destination =
      REGISTRATION_URL.startsWith("http://") || REGISTRATION_URL.startsWith("https://")
        ? REGISTRATION_URL
        : `https://${REGISTRATION_URL}`;

    window.open(destination, "_blank", "noopener,noreferrer");
  }
}
