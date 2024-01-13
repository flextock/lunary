import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Overlay,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { IconMessage } from "@tabler/icons-react"
import CopyText from "../Blocks/CopyText"
import { useCurrentProject } from "@/utils/dataHooks"
import { ListFeatures } from "./Paywall"

export default function Empty({
  Icon,
  title,
  description,
  enable,
  children,
  buttonLabel = "Documentation →",
  features,
  onClick,
  showProjectId,
}: {
  title: string
  description?: string
  enable?: boolean
  features?: string[]
  showProjectId?: boolean
  Icon?: React.ComponentType<any>
  buttonLabel?: string
  onClick?: () => void
  children?: React.ReactNode
}) {
  const { currentProject } = useCurrentProject()

  if (!enable && children) {
    return children
  }

  const btnProps =
    typeof onClick !== "undefined"
      ? {
          onClick,
        }
      : {
          component: "a",
          target: "_blank",
          href: `https://lunary.ai/docs?app=${currentProject?.id}`,
        }

  return (
    <Box
      pos="absolute"
      className="unblockable"
      top={0}
      left={0}
      right={0}
      bottom={0}
      h={`100%`}
      style={{
        overflow: "hidden",
      }}
    >
      <Overlay
        zIndex={3}
        blur={3}
        top={0}
        left={0}
        right={0}
        display="flex"
        bottom={0}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card withBorder p={50} w="fit-content" miw={600}>
          <Stack align="start" gap="xl">
            <Group>
              <ThemeIcon size={42} radius={12}>
                {Icon && <Icon size={26} />}
              </ThemeIcon>
              <Title order={3}>{title}</Title>
            </Group>
            {description && <Text size="lg">{description}</Text>}
            {features && <ListFeatures features={features} />}
            <Button size="md" {...btnProps}>
              {buttonLabel}
            </Button>
            {showProjectId && (
              <Text>
                Project ID:{" "}
                <CopyText
                  value={currentProject?.id}
                  color={"var(--mantine-color-violet-light)"}
                />
              </Text>
            )}
            <Stack>
              <Text size="sm">Any issue? Get help from a founder.</Text>
              <Group>
                <Button
                  size="sm"
                  leftSection={<IconMessage size={16} />}
                  color="blue"
                  variant="light"
                  onClick={() => {
                    $crisp.push(["do", "chat:open"])
                  }}
                >
                  Chat with us
                </Button>
              </Group>
            </Stack>
          </Stack>
        </Card>
      </Overlay>
      {children && (
        <Box pr={50} pl={120} py={70}>
          {children}
        </Box>
      )}
    </Box>
  )
}
