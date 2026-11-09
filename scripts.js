const workTabs = [...document.querySelectorAll(".work-tab")];

function selectWorkTab(selectedTab, moveFocus = false) {
  for (const tab of workTabs) {
    const isSelected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;

    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.hidden = !isSelected;
  }

  if (moveFocus) {
    selectedTab.focus();
  }
}

function selectWorkTabFromHash() {
  const hash = window.location.hash.slice(1);
  const tab = workTabs.find(
    (candidate) =>
      candidate.id === hash || candidate.getAttribute("aria-controls") === hash,
  );

  if (tab) {
    selectWorkTab(tab);
  }
}

for (const [index, tab] of workTabs.entries()) {
  tab.addEventListener("click", () => selectWorkTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % workTabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + workTabs.length) % workTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = workTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectWorkTab(workTabs[nextIndex], true);
  });
}

window.addEventListener("hashchange", selectWorkTabFromHash);
selectWorkTabFromHash();
