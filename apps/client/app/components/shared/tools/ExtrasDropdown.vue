<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger>
      <UiButton as="span" variant="ghost" class="p-2"
        ><IconEllipsisVertical :size="20"
      /></UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="space-y-1" align="start" side="bottom">
      <UiDropdownMenuItem to="/soundbite/create">
        <IconPlus :size="16" />
        {{
          $t(
            "app.components.shared.tools.extrasDropdown.button.createSoundbite",
          )
        }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem to="/soundbite/discover">
        <IconCompass :size="16" shadow />
        {{
          $t(
            "app.components.shared.tools.extrasDropdown.button.discoverSoundbite",
          )
        }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
